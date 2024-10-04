
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/auth/AuthContext'; 
import NavBar from './components/NavBar';
import Login from './components/Login';
import CourseList from './components/CourseList';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cursos" element={<CourseList />} />
                    {/* Agrega otras rutas aquí */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
