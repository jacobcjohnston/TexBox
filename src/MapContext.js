import React, {createContext, useState} from "react";

export const MapContext = createContext();


export const MapProvider = ({children}) => {
    const [map, setMap] = useState({});

    return (
        <MapContext.Provider value={{map, setMap}}>
            {children}
        </MapContext.Provider>
    );
}