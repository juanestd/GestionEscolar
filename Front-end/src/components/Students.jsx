import { useState } from 'react';

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
                // Resetear los campos del formulario
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
        <div style={styles.container}>
            <h2 style={styles.title}>Agregar Estudiante</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <InputField 
                    label="Nombre Completo" 
                    value={nombreCompleto} 
                    onChange={setNombreCompleto} 
                    required 
                />
                <InputField 
                    label="Correo Electrónico" 
                    type="email" 
                    value={correoElectronico} 
                    onChange={setCorreoElectronico} 
                    required 
                />
                <InputField 
                    label="Número de Teléfono" 
                    value={numeroTelefono} 
                    onChange={setNumeroTelefono} 
                    required 
                />
                <InputField 
                    label="Fecha de Nacimiento" 
                    type="date" 
                    value={fechaNacimiento} 
                    onChange={setFechaNacimiento} 
                    required 
                />
                <InputField 
                    label="Dirección" 
                    value={direccion} 
                    onChange={setDireccion} 
                    required 
                />
                <div style={styles.selectContainer}>
                    <label style={styles.label}>Rol</label>
                    <select
                        style={styles.select}
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="Estudiante">Estudiante</option>
                        <option value="Profesor">Profesor</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                </div>
                <InputField 
                    label="Nombre de Usuario" 
                    value={nombreUsuario} 
                    onChange={setNombreUsuario} 
                    required 
                />
                <InputField 
                    label="Contraseña" 
                    type="password" 
                    value={contraseña} 
                    onChange={setContraseña} 
                    required 
                />
                <button type="submit" style={styles.button}>Agregar Estudiante</button>
            </form>
        </div>
    );
};

const InputField = ({ label, type = 'text', value, onChange, required }) => (
    <div style={styles.inputContainer}>
        <label style={styles.label}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            style={styles.input}
        />
    </div>
);

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f9fa', 
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '50px auto',
        width: '400px',
    },
    title: {
        marginBottom: '20px',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    selectContainer: {
        marginBottom: '15px',
    },
    select: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Students;
