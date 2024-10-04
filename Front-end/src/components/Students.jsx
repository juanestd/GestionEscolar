import  { useState } from 'react';

const Students = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [rol, setRol] = useState('Estudiante'); 
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoEstudiante = {
            nombre_completo: nombreCompleto,
            correo_electronico: correoElectronico,
            numero_telefono: numeroTelefono,
            fecha_nacimiento: fechaNacimiento,
            direccion: direccion,
            rol: rol,
            nombre_usuario: nombreUsuario,
            contraseña: contraseña,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/students/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoEstudiante),
            });

            if (response.ok) {
                console.log('Estudiante agregado con éxito');
                
                setNombreCompleto('');
                setCorreoElectronico('');
                setNumeroTelefono('');
                setFechaNacimiento('');
                setDireccion('');
                setNombreUsuario('');
                setContraseña('');
            } else {
                console.error('Error al agregar estudiante');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Estudiante</h2>
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
                    <label className="form-label">Rol</label>
                    <select
                        className="form-control"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="Estudiante">Estudiante</option>
                        <option value="Profesor">Profesor</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
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
                <button type="submit" className="btn btn-primary">Agregar Estudiante</button>
            </form>
        </div>
    );
};

export default Students;
