
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/auth/AuthContext'; 
import NavBar from './components/NavBar';
import Login from './components/Login';
import CourseList from './components/CourseList';
import Students   from './components/Students';
import Teachers from './components/Teachers';
import Calificaciones from './components/Calificaciones';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cursos" element={<CourseList />} />
                    <Route path="/agregar-estudiante" element={<Students />} />
                    <Route path="/agregar-profesor" element={<Teachers />} />
                    <Route path="/Calificaciones" element={<Calificaciones />} />
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
