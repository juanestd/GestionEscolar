// src/router/PrivateRoute.jsx
import  { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route 
            {...rest} 
            element={user ? element : <Navigate to="/login" replace />} 
        />
    );
};

export default PrivateRoute;
