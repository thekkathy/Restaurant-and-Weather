import React, { useState, createContext } from 'react';
const PositionContext = createContext();

export default function PositionProvider({ children }) {
    const [position, setPosition] = useState({ lat: 38.0293, lon: -78.5055744 });

    return <PositionContext.Provider value={{ position, setPosition }}>
        {children}
    </PositionContext.Provider>
}

export { PositionContext };