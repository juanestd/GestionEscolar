// src/router/AppRoutes.jsx

import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import CourseList from '../components/CourseList';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <PrivateRoute path="/cursos" element={<CourseList />} />
            {/* Otras rutas protegidas o públicas pueden ir aquí */}
        </Routes>
    );
};

export default AppRoutes;
