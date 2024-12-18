import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData); 
        localStorage.setItem('token', tokenData);
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");};

    return (
        <AuthContext.Provider value={{ user,token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
