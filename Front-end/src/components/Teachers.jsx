import { useState } from 'react';

const Teachers = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoProfesor = {
            nombre_completo: nombreCompleto,
            correo_electronico: correoElectronico,
            numero_telefono: numeroTelefono,
            fecha_nacimiento: fechaNacimiento,
            direccion: direccion,
            departamento: departamento,
            nombre_usuario: nombreUsuario,
            contraseña: contraseña,
            rol: 'Profesor',  
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/teachers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProfesor),
            });

            if (response.ok) {
                setMensaje('Profesor agregado con éxito'); 
                
                setNombreCompleto('');
                setCorreoElectronico('');
                setNumeroTelefono('');
                setFechaNacimiento('');
                setDireccion('');
                setDepartamento('');
                setNombreUsuario('');
                setContraseña('');
            } else {
                const errorData = await response.json();
                setMensaje(`Error al agregar profesor: ${errorData.detail || 'Por favor, intente de nuevo.'}`); 
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Error al conectar con el servidor'); 
        }
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Profesor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        value={numeroTelefono}
                        onChange={(e) => setNumeroTelefono(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Departamento</label>
                    <input
                        type="text"
                        className="form-control"
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Profesor</button>
            </form>

            
            {mensaje && (
                <div className="mt-3 alert alert-info">
                    {mensaje}
                </div>
            )}
        </div>
    );
};

export default Teachers;
