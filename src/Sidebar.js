import React, { useContext } from "react";
import { MapContext } from "./MapContext";

export default function Sidebar() {
    const {map, _} = useContext(MapContext);


    const html = `
    <!DOCTYPE html>
    <html lang="en>
    <meta charset="UTF-8">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="">
    <style>
    </style>
    <body>
        <div id="root"></div>


        <script type="module">
        
        </script>


    </body>
    <html>
    `



    return (
        <div>
            <div className="Sidebar">
                <div className="SidebarBackdrop">
                    <h1 className="Title">TexBox</h1>
                    <h2 className="Title">A simple text-based game engine</h2>
                    <a
                        href = {
                            `data:text/plain,${html}`
                        }
                        download = "adventure.html"
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        <button id="Export">Export Story</button>
                    </a>
                </div>
            </div>
        </div>
    );
}