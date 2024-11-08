import { useState, useEffect } from "react";

function getVMin() {
    const {innerWidth:width, innerHeight:height} = window;
    return Math.min(width, height)
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getVMin());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getVMin())
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    return windowDimensions;
}