import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [error, setError] = useState(null);
    const [reportType, setReportType] = useState('all'); 

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
    
        // Cargar estudiantes matriculados para el curso seleccionado
        try {
            const response = await axios.get(`http://127.0.0.1:8000/courses/${course.id}/students/`);
            const studentIds = response.data.estudiantes; 
            const studentDetailsPromises = studentIds.map(id => axios.get(`http://127.0.0.1:8000/students/${id}`));
            const studentDetailsResponses = await Promise.all(studentDetailsPromises);
            const enrolledStudents = studentDetailsResponses.map(res => res.data);
    
            setEnrolledStudents(enrolledStudents);
            setNewCourse(prevCourse => ({
                ...prevCourse,
                estudiantes: studentIds 
            }));
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

    // Generar y descargar reporte en PDF solo para el curso seleccionado
    const generatePDFReport = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text("Reporte de Horarios y Asignaciones de Cursos", 20, 20);
        
        let yPosition = 40; 
    
        if (reportType === 'all') {
            // Generar reporte de todos los cursos
            courses.forEach((course, index) => {
                doc.setFontSize(14);
                doc.text(`${index + 1}. ${course.nombre_del_curso}`, 20, yPosition);
                yPosition += 10; 
                doc.setFontSize(12);
                doc.text(`Descripción: ${course.descripcion}`, 20, yPosition);
                yPosition += 10; 
                doc.text(`Horario: ${course.horario}`, 20, yPosition);
                yPosition += 10; 
                const teacherName = teachers.find(t => t.id === course.profesor)?.nombre_completo || "Desconocido";
                doc.text(`Profesor: ${teacherName}`, 20, yPosition);
                yPosition += 20; 
            });
        } else if (reportType === 'selected' && selectedCourse) {
            // Generar reporte del curso seleccionado
            doc.setFontSize(14);
            doc.text(`1. ${selectedCourse.nombre_del_curso}`, 20, yPosition);
            yPosition += 10; 
            doc.setFontSize(12);
            doc.text(`Descripción: ${selectedCourse.descripcion}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Horario: ${selectedCourse.horario}`, 20, yPosition);
            yPosition += 10; 
            const teacherName = teachers.find(t => t.id === selectedCourse.profesor)?.nombre_completo || "Desconocido";
            doc.text(`Profesor: ${teacherName}`, 20, yPosition);
            yPosition += 10; 
    
            if (enrolledStudents.length > 0) {
                doc.text(`Estudiantes Matriculados:`, 20, yPosition);
                yPosition += 10; 
                enrolledStudents.forEach((student, index) => {
                    doc.text(`${index + 1}. ${student.nombre_completo}`, 20, yPosition);
                    yPosition += 10; 
                });
            } else {
                doc.text(`No hay estudiantes matriculados.`, 20, yPosition);
            }
        }
    
        doc.save('reporte_cursos.pdf');
    };
    

    
    
    <button className="btn btn-success" onClick={generatePDFReport} disabled={!selectedCourse}>Generar Reporte PDF</button>

    return (
        <div className="container mt-5">
            {error && <p className="text-danger">{error}</p>}
            
            <div className="mb-3">
                <button className={`btn ${activeTab === 'view' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('view')}>Ver Cursos</button>
                <button className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => {
                    setActiveTab('add'); 
                    setNewCourse({ nombre_del_curso: '', descripcion: '', horario: '', profesor: '', estudiantes: [] }); // Limpia el formulario
                }}>Agregar Curso</button>
                <button className={`btn ${activeTab === 'update' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('update')}>Actualizar Cursos</button>
    
                <button className="btn btn-success" onClick={generatePDFReport}>Generar Reporte PDF</button>
            </div>
    
            <div className="mb-3">
                <label className="mr-2">Generar reporte de:</label>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="reportType"
                        id="allCourses"
                        value="all"
                        checked={reportType === 'all'}
                        onChange={() => setReportType('all')}
                    />
                    <label className="form-check-label" htmlFor="allCourses">Todos los Cursos</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="reportType"
                        id="selectedCourse"
                        value="selected"
                        checked={reportType === 'selected'}
                        onChange={() => setReportType('selected')}
                    />
                    <label className="form-check-label" htmlFor="selectedCourse">Curso Seleccionado</label>
                </div>
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
                                <button className="btn btn-danger mt-2" onClick={() => handleDeleteCourse(selectedCourse.id)}>Eliminar Curso</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
    
            {activeTab === 'add' && (
                <div className="row">
                    <div className="col-md-6">
                        <h2>Agregar Nuevo Curso</h2>
                        <form onSubmit={handleAddCourse}>
                            <div className="form-group">
                                <label>Nombre del Curso:</label>
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
                                <label>Descripción:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descripcion"
                                    value={newCourse.descripcion}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Horario:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="horario"
                                    value={newCourse.horario}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Profesor:</label>
                                <select
                                    className="form-control"
                                    name="profesor"
                                    value={newCourse.profesor}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccionar Profesor</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.nombre_completo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Estudiantes:</label>
                                {students.map((student) => (
                                    <div key={student.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`student-${student.id}`}
                                            checked={newCourse.estudiantes.includes(student.id)}
                                            onChange={() => handleStudentSelection(student.id)}
                                        />
                                        <label className="form-check-label" htmlFor={`student-${student.id}`}>
                                            {student.nombre_completo}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Agregar Curso</button>
                        </form>
                    </div>
                </div>
            )}
    
    {activeTab === 'update' && isEditing && (
    <div className="row">
        <div className="col-md-6">
            <h2>Actualizar Curso</h2>
            <form onSubmit={handleUpdateCourse}>
                <div className="form-group">
                    <label>Nombre del Curso:</label>
                    <input
                        type="text"
                        name="nombre_del_curso"
                        className="form-control"
                        value={newCourse.nombre_del_curso}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        className="form-control"
                        value={newCourse.descripcion}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Horario:</label>
                    <input
                        type="text"
                        name="horario"
                        className="form-control"
                        value={newCourse.horario}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Profesor:</label>
                    <select
                        name="profesor"
                        className="form-control"
                        value={newCourse.profesor}
                        onChange={handleInputChange}
                    >
                        {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.nombre_completo}
                            </option>
                        ))}
                    </select>
                </div>
                <h4>Seleccionar Estudiantes:</h4>
                {students.map(student => (
                    <div key={student.id}>
                        <input
                            type="checkbox"
                            checked={newCourse.estudiantes.includes(student.id)}
                            onChange={() => handleStudentSelection(student.id)}
                        />
                        {student.nombre_completo}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Actualizar Curso</button>
            </form>
        </div>
    </div>
)}

        </div>
    );
    }
    
    export default CourseList;
    