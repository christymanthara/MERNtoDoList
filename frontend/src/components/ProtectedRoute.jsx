// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext); // Access the current user's authentication status

    // If there's no authenticated user, redirect to login page
    return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
