import React, { useState, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const logOut = () => {
        setUsername("");
        setPassword("");
    }

    return (
        <UserContext.Provider value={{ username, setUsername, password, setPassword, logOut }} >
            {children}
        </UserContext.Provider >
    );
}
export { UserProvider, UserContext };