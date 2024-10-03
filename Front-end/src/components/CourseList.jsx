import  { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/course/course/v1/course/');
                console.log(response.data); 
                setCourses(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Error fetching courses: ' + (err.response ? err.response.data : err.message));
            }
        };

        fetchCourses();
    }, []);

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
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
                            courses.map(course => (
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
                
                <div className="col-md-8">
                    {selectedCourse ? (
                        <div className="card mt-3">
                            <div className="card-body">
                                <h2>{selectedCourse.name}</h2>
                                <p><strong>Descripción:</strong> {selectedCourse.description || 'No disponible'}</p>
                                <p><strong>Horario:</strong> {selectedCourse.schedule || 'No disponible'}</p>
                                <p><strong>Profesor:</strong> {selectedCourse.teacher?.full_name || 'No disponible'}</p>
                                <p><strong>Estudiantes:</strong>
                                    <ul>
                                        {selectedCourse.students && Array.isArray(selectedCourse.students) && selectedCourse.students.length > 0 ? (
                                            selectedCourse.students.map(student => (
                                                <li key={student.id}>
                                                    {student.full_name} (Grado: {student.grade})
                                                </li>
                                            ))
                                        ) : (
                                            <li>No hay estudiantes inscritos.</li>
                                        )}
                                    </ul>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-3">Selecciona un curso para ver más detalles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
