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
                // Resetear campos del formulario
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
        <div style={styles.container}>
            <h2 style={styles.title}>Agregar Profesor</h2>
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
                <InputField 
                    label="Departamento" 
                    value={departamento} 
                    onChange={setDepartamento} 
                    required 
                />
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
                <button type="submit" style={styles.button}>Agregar Profesor</button>
            </form>

            {mensaje && (
                <div style={styles.alert}>
                    {mensaje}
                </div>
            )}
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
        backgroundColor: '#f8f9fa', // Fondo suave
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
    alert: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
        borderRadius: '4px',
        border: '1px solid #bee5eb',
    },
};

export default Teachers;
