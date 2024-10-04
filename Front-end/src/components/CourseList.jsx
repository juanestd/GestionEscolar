import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ 
        nombre_del_curso: '', 
        descripcion: '', 
        horario: '', 
        profesor: '', 
        estudiantes: [] 
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [activeTab, setActiveTab] = useState('view'); 

    useEffect(() => {
        const fetchCoursesAndTeachers = async () => {
            try {
                const courseResponse = await axios.get('http://127.0.0.1:8000/courses/');
                setCourses(courseResponse.data);

                const teacherResponse = await axios.get('http://127.0.0.1:8000/teachers/');
                setTeachers(teacherResponse.data);

                const studentResponse = await axios.get('http://127.0.0.1:8000/students/');
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
            profesor: course.profesor || '', 
            estudiantes: [] 
        });
        setShowAddForm(false);

        
        try {
            const response = await axios.get(`http://127.0.0.1:8000/courses/${course.id}/students/`);
            const studentIds = response.data.estudiantes;
            const studentDetailsPromises = studentIds.map(id => axios.get(`http://127.0.0.1:8000/students/${id}`));
            const studentDetailsResponses = await Promise.all(studentDetailsPromises);
            const enrolledStudents = studentDetailsResponses.map(res => res.data);
            setEnrolledStudents(enrolledStudents);
        } catch (err) {
            setError('Error fetching enrolled students: ' + (err.response ? err.response.data : err.message));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleStudentSelection = (studentId) => {
        setNewCourse(prevCourse => ({
            ...prevCourse,
            estudiantes: prevCourse.estudiantes.includes(studentId)
                ? prevCourse.estudiantes.filter(id => id !== studentId) 
                : [...prevCourse.estudiantes, studentId] 
        }));
    };

    // Add a new course
    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/courses/', {
                nombre_del_curso: newCourse.nombre_del_curso,
                descripcion: newCourse.descripcion,
                horario: newCourse.horario,
                profesor: newCourse.profesor, 
                estudiantes: newCourse.estudiantes
            });
            setCourses([...courses, response.data]);
            setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '', estudiantes: [] });
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
                profesor: newCourse.profesor, 
                estudiantes: newCourse.estudiantes
            });
            const updatedCourses = courses.map((course) =>
                course.id === selectedCourse.id ? { ...course, ...newCourse } : course
            );
            setCourses(updatedCourses);
            setSelectedCourse(null);
            setIsEditing(false);
            setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '', estudiantes: [] });
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
            
            <div className="mb-3">
                <button className={`btn ${activeTab === 'view' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('view')}>Ver Cursos</button>
                <button className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('add')}>Agregar Curso</button>
                <button className={`btn ${activeTab === 'update' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('update')}>Actualizar Cursos</button>
            </div>

            {activeTab === 'view' && (
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
                        {selectedCourse && (
                            <div className="mt-3">
                                <h3>Detalles del Curso: {selectedCourse.nombre_del_curso}</h3>
                                <p><strong>Descripción:</strong> {selectedCourse.descripcion}</p>
                                <p><strong>Horario:</strong> {selectedCourse.horario}</p>
                                <p><strong>Profesor:</strong> {teachers.find(teacher => teacher.id === selectedCourse.profesor)?.nombre_completo || 'Desconocido'}</p>
                                <h4>Estudiantes Matriculados:</h4>
                                <ul>
                                    {enrolledStudents.map((student) => (
                                        <li key={student.id}>{student.nombre_completo}</li>
                                    ))}
                                </ul>
                                <button className="btn btn-danger mt-2" onClick={() => handleDeleteCourse(selectedCourse.id)}>
                                    Eliminar Curso
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'add' && (
                <div className="row">
                    <div className="col-md-8">
                        <h2>Gestión de Cursos</h2>
                        <button
                            className="btn btn-success mb-3"
                            style={{ float: 'right' }}
                            onClick={() => {
                                setShowAddForm(!showAddForm);
                                setIsEditing(false);
                                setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '', estudiantes: [] });
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
                                        name="nombre_del_curso"
                                        value={newCourse.nombre_del_curso}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        value={newCourse.descripcion}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Horario</label>
                                    <input
                                        type="text"
                                        name="horario"
                                        value={newCourse.horario}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Profesor</label>
                                    <select
                                        name="profesor"
                                        value={newCourse.profesor}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Seleccione un profesor</option>
                                        {teachers.map((teacher) => (
                                            <option key={teacher.id} value={teacher.id}>{teacher.nombre_completo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estudiantes</label>
                                    <ul className="list-group">
                                        {students.map((student) => (
                                            <li key={student.id} className="list-group-item">
                                                <input
                                                    type="checkbox"
                                                    checked={newCourse.estudiantes.includes(student.id)}
                                                    onChange={() => handleStudentSelection(student.id)}
                                                />
                                                {student.nombre_completo}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button type="submit" className="btn btn-primary">Agregar Curso</button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'update' && (
                <div className="row">
                    <div className="col-md-8">
                        <h2>Actualizar Cursos</h2>
                        {isEditing && (
                            <form onSubmit={handleUpdateCourse}>
                                <div className="form-group">
                                    <label>Nombre del Curso</label>
                                    <input
                                        type="text"
                                        name="nombre_del_curso"
                                        value={newCourse.nombre_del_curso}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        value={newCourse.descripcion}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Horario</label>
                                    <input
                                        type="text"
                                        name="horario"
                                        value={newCourse.horario}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Profesor</label>
                                    <select
                                        name="profesor"
                                        value={newCourse.profesor}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Seleccione un profesor</option>
                                        {teachers.map((teacher) => (
                                            <option key={teacher.id} value={teacher.id}>{teacher.nombre_completo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estudiantes</label>
                                    <ul className="list-group">
                                        {students.map((student) => (
                                            <li key={student.id} className="list-group-item">
                                                <input
                                                    type="checkbox"
                                                    checked={newCourse.estudiantes.includes(student.id)}
                                                    onChange={() => handleStudentSelection(student.id)}
                                                />
                                                {student.nombre_completo}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button type="submit" className="btn btn-primary">Actualizar Curso</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseList;
