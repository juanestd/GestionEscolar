import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]); 
    const [students, setStudents] = useState([]); 
    const [enrolledStudents, setEnrolledStudents] = useState([]); // Estudiantes matriculados
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); 
    const [selectedStudent, setSelectedStudent] = useState(''); 

    useEffect(() => {
        const fetchCoursesAndTeachers = async () => {
            try {
                const courseResponse = await axios.get('http://127.0.0.1:8000/courses/'); // URL de cursos
                setCourses(courseResponse.data);

                const teacherResponse = await axios.get('http://127.0.0.1:8000/teachers/'); // URL de profesores
                setTeachers(teacherResponse.data);

                const studentResponse = await axios.get('http://127.0.0.1:8000/students/'); // URL de estudiantes
                setStudents(studentResponse.data);
            } catch (err) {
                setError('Error fetching data: ' + (err.response ? err.response.data : err.message));
            }
        };

        fetchCoursesAndTeachers();
    }, []);

    const handleCourseSelect = async (course) => {
        setSelectedCourse(course);
        setIsEditing(true);
        setNewCourse({
            nombre_del_curso: course.nombre_del_curso || '',
            descripcion: course.descripcion || '',
            horario: course.horario || '',
            profesor: course.profesor || ''
        });
        setShowAddForm(false); 
    
        // Cargar estudiantes matriculados para el curso seleccionado
        try {
            const response = await axios.get(`http://127.0.0.1:8000/courses/${course.id}/students/`); 
            const studentIds = response.data.estudiantes; // Asegúrate de que esto accede a los IDs correctos
            const studentDetailsPromises = studentIds.map(id => axios.get(`http://127.0.0.1:8000/students/${id}`));
            const studentDetailsResponses = await Promise.all(studentDetailsPromises);
            const enrolledStudents = studentDetailsResponses.map(res => res.data); // Asumiendo que aquí obtienes los detalles del estudiante
            setEnrolledStudents(enrolledStudents);
        } catch (err) {
            setError('Error fetching enrolled students: ' + (err.response ? err.response.data : err.message));
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    // Add a new course
    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/courses/', {
                nombre_del_curso: newCourse.nombre_del_curso,
                descripcion: newCourse.descripcion,
                horario: newCourse.horario,
                profesor: newCourse.profesor
            });
            setCourses([...courses, response.data]);
            setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '' });
            setShowAddForm(false); 
        } catch (err) {
            setError('Error adding course: ' + (err.response?.data ? JSON.stringify(err.response.data) : err.message));
        }
    };

    // Update an existing course
    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/courses/${selectedCourse.id}/`, {
                nombre_del_curso: newCourse.nombre_del_curso,
                descripcion: newCourse.descripcion,
                horario: newCourse.horario,
                profesor: newCourse.profesor
            });
            const updatedCourses = courses.map((course) =>
                course.id === selectedCourse.id ? { ...course, ...newCourse } : course
            );
            setCourses(updatedCourses);
            setSelectedCourse(null);
            setIsEditing(false);
            setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '' });
        } catch (err) {
            setError('Error updating course: ' + (err.response?.data ? JSON.stringify(err.response.data) : err.message));
        }
    };

    // Delete a course
    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/courses/${courseId}/`);
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
                                    {course.nombre_del_curso}
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="col-md-8">
                    <h2>Gestión de Cursos</h2>
                    <button
                        className="btn btn-success mb-3"
                        style={{ float: 'right' }}
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            setIsEditing(false); 
                            setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '' }); 
                        }}
                    >
                        {showAddForm ? 'Ocultar Formulario' : 'Agregar Nuevo Curso'}
                    </button>

                    {showAddForm && (
                        <form onSubmit={handleAddCourse}>
                            <div className="form-group">
                                <label>Nombre del Curso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre_del_curso"
                                    value={newCourse.nombre_del_curso}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descripcion"
                                    value={newCourse.descripcion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Horario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="horario"
                                    value={newCourse.horario}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Profesor</label>
                                <select
                                    className="form-control"
                                    name="profesor"
                                    value={newCourse.profesor}
                                    onChange={(e) => setNewCourse({ ...newCourse, profesor: e.target.value })}
                                    required
                                >
                                    <option value="">Selecciona un profesor</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.nombre_completo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success mt-2">
                                Agregar Curso
                            </button>
                        </form>
                    )}

                    {isEditing && (
                        <form onSubmit={handleUpdateCourse}>
                            <div className="form-group">
                                <label>Nombre del Curso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre_del_curso"
                                    value={newCourse.nombre_del_curso}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descripcion"
                                    value={newCourse.descripcion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Horario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="horario"
                                    value={newCourse.horario}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Profesor</label>
                                <select
                                    className="form-control"
                                    name="profesor"
                                    value={newCourse.profesor}
                                    onChange={(e) => setNewCourse({ ...newCourse, profesor: e.target.value })}
                                    required
                                >
                                    <option value="">Selecciona un profesor</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.nombre_completo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-warning mt-2">
                                Actualizar Curso
                            </button>
                        </form>
                    )}

                    {selectedCourse && (
                        <div>
                            <h3>Estudiantes Matriculados</h3>
                            <ul className="list-group">
                                {Array.isArray(enrolledStudents) && enrolledStudents.length > 0 ? (
                                    enrolledStudents.map((student) => (
                                        <li key={student.id} className="list-group-item">
                                            {student.nombre_completo}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No hay estudiantes matriculados.</li>
                                )}
                            </ul>
                            <button className="btn btn-danger mt-3" onClick={() => handleDeleteCourse(selectedCourse.id)}>
                                Eliminar Curso
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
