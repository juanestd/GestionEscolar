
const API_URL = "http://localhost:8000/course/";


export const getCourses = async () => {
    const response = await fetch(`${API_URL}`);
    return response.json();
};


export const createCourse = async (courseData) => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    return response.json();
};


export const updateCourse = async (courseId, courseData) => {
    const response = await fetch(`${API_URL}${courseId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    return response.json();
};


export const deleteCourse = async (courseId) => {
    const response = await fetch(`${API_URL}${courseId}/`, {
        method: 'DELETE',
    });
    return response.json();
};
