
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import CourseList from '../components/CourseList';
import Students from '../components/Students';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <PrivateRoute path="/cursos" element={<CourseList />} />
            <Route path="/agregar-estudiante" element={<Students/>} /> 
            {}
        </Routes>
    );
};

export default AppRoutes;
