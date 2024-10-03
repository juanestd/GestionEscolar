import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]); // Estado para los docentes
    const [students, setStudents] = useState([]); // Estado para los estudiantes
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ name: '', description: '', schedule: '', teacher: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); 
    const [selectedStudent] = useState(''); 

    
    useEffect(() => {
        const fetchCoursesAndTeachers = async () => {
            try {
                const courseResponse = await axios.get('http://127.0.0.1:8000/course/course/v1/course/');
                setCourses(courseResponse.data);

                const teacherResponse = await axios.get('http://127.0.0.1:8000/course/teacher/v1/'); 
                setTeachers(teacherResponse.data);

                const studentResponse = await axios.get('http://127.0.0.1:8000/course/student/v1/'); 
                setStudents(studentResponse.data);
            } catch (err) {
                setError('Error fetching data: ' + (err.response ? err.response.data : err.message));
            }
        };

        fetchCoursesAndTeachers();
    }, []);

    
    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setIsEditing(true);
        setNewCourse({
            name: course.name || '',
            description: course.description || '',
            schedule: course.schedule || '',
            teacher: course.teacher || ''
        });
        setShowAddForm(false); 
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    // Add a new course
    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/course/course/v1/course/', {
                name: newCourse.name,
                description: newCourse.description,
                schedule: newCourse.schedule,
                teacher: newCourse.teacher
            });
            setCourses([...courses, response.data]);
            setNewCourse({ name: '', description: '', schedule: '', teacher: '' });
            setShowAddForm(false); 
        } catch (err) {
            setError('Error adding course: ' + (err.response?.data ? JSON.stringify(err.response.data) : err.message));
        }
    };

    // Update an existing course
    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/course/course/v1/course/${selectedCourse.id}/`, {
                name: newCourse.name,
                description: newCourse.description,
                schedule: newCourse.schedule,
                teacher: newCourse.teacher
            });
            const updatedCourses = courses.map((course) =>
                course.id === selectedCourse.id ? { ...course, ...newCourse } : course
            );
            setCourses(updatedCourses);
            setSelectedCourse(null);
            setIsEditing(false);
            setNewCourse({ name: '', description: '', schedule: '', teacher: '' });
        } catch (err) {
            setError('Error updating course: ' + (err.response?.data ? JSON.stringify(err.response.data) : err.message));
        }
    };

    // Delete a course
    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/course/course/v1/course/${courseId}/`);
            const updatedCourses = courses.filter((course) => course.id !== courseId);
            setCourses(updatedCourses);
        } catch (err) {
            setError('Error deleting course: ' + (err.response ? err.response.data : err.message));
        }
    };

    return (
        <div className="container mt-5">
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {}
                <div className="col-md-4">
                    <h2>Cursos Disponibles</h2>
                    <ul className="list-group">
                        {courses.length === 0 ? (
                            <li className="list-group-item">No hay cursos disponibles.</li>
                        ) : (
                            courses.map((course) => (
                                <li
                                    key={course.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleCourseSelect(course)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {course.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {}
                <div className="col-md-8">
                    <h2>Gestión de Cursos</h2>

                    {}
                    <button
                        className="btn btn-success mb-3"
                        style={{ float: 'right' }}
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            setIsEditing(false); 
                            setNewCourse({ name: '', description: '', schedule: '', teacher: '' }); 
                        }}
                    >
                        {showAddForm ? 'Ocultar Formulario' : 'Agregar Nuevo Curso'}
                    </button>

                    {}
                    {showAddForm && (
                        <form onSubmit={handleAddCourse}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={newCourse.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={newCourse.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Horario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="schedule"
                                    value={newCourse.schedule}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Profesor</label>
                                <select
                                    className="form-control"
                                    name="teacher"
                                    value={newCourse.teacher}
                                    onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                                    required
                                >
                                    <option value="">Selecciona un profesor</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.name}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success mt-2">
                                Agregar Curso
                            </button>
                        </form>
                    )}

                    {}
                    <div className="mt-3">
                        <h4>Estudiante Seleccionado: {selectedStudent}</h4>
                    </div>

                    {}
                    {isEditing && (
                        <form onSubmit={handleUpdateCourse}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={newCourse.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={newCourse.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Horario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="schedule"
                                    value={newCourse.schedule}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Profesor</label>
                                <select
                                    className="form-control"
                                    name="teacher"
                                    value={newCourse.teacher}
                                    onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                                    required
                                >
                                    <option value="">Selecciona un profesor</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.name}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">
                                Actualizar Curso
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger mt-2 ms-2"
                                onClick={() => handleDeleteCourse(selectedCourse.id)}
                            >
                                Eliminar Curso
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
