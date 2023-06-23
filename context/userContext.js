import React, { useState, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const logOut = () => {
        setUserId("");
        setUsername("");
        setPassword("");
        setEmail("");
        setPhone("");
    }

    return (
        <UserContext.Provider value={{ userId, setUserId, username, setUsername, password, setPassword, email, setEmail, phone, setPhone, logOut }} >
            {children}
        </UserContext.Provider >
    );
}
export { UserProvider, UserContext };