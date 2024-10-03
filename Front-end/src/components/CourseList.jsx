import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ name: '', description: '', schedule: '', teacher: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); // Controla la visibilidad del formulario de agregar

    // Fetch courses from the API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/course/course/v1/course/');
                setCourses(response.data);
            } catch (err) {
                setError('Error fetching courses: ' + (err.response ? err.response.data : err.message));
            }
        };

        fetchCourses();
    }, []);

    // Select a course to update
    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setIsEditing(true);
        setNewCourse({
            name: course.name || '',
            description: course.description || '',
            schedule: course.schedule || '',
            teacher: course.teacher || ''
        });
        setShowAddForm(false); // Ocultar formulario de agregar si se selecciona un curso
    };

    // Handle input change
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
            setShowAddForm(false); // Ocultar formulario tras agregar el curso
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
            });
            pdatedCourses = courses.map((course) =>
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
            await axios.delete('http://127.0.0.1:8000/course/course/v1/course/${courseId}/');
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
                {/* List of courses */}
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

                {/* Form to update or add a course */}
                <div className="col-md-8">
                    <h2>Gestión de Cursos</h2>

                    {/* Botón para agregar un nuevo curso */}
                    <button
                        className="btn btn-success mb-3"
                        style={{ float: 'right' }}
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            setIsEditing(false); // Desactivar edición si estaba seleccionada
                            setNewCourse({ name: '', description: '', schedule: '', teacher: '' }); // Limpiar formulario
                        }}
                    >
                        {showAddForm ? 'Ocultar Formulario' : 'Agregar Nuevo Curso'}
                    </button>

                    {/* Mostrar el formulario solo si showAddForm es true */}
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
                                <input
                                    type="text"
                                    className="form-control"
                                    name="teacher"
                                    value={newCourse.teacher}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">
                                Agregar Curso
                            </button>
                        </form>
                    )}

                    {/* Formulario para actualizar o eliminar curso */}
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
                                <input
                                    type="text"
                                    className="form-control"
                                    name="teacher"
                                    value={newCourse.teacher}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 me-2">
                                Actualizar Curso
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger mt-2"
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