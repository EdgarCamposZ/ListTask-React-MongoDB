// Importa los estilos CSS específicos para el componente Addtask.
import './Addtask.css';

// Importa React y el módulo useState.
import { useState } from 'react';

// Importa el módulo Axios para realizar solicitudes HTTP.
import axios from 'axios';

// Importa PropTypes para validar las props.
import PropTypes from 'prop-types';

// Componente funcional Addtask.
function Addtask(props) {
    // Define el estado para almacenar la tarea que se está agregando.
    const [task, setTask] = useState("");

    // Función para agregar una tarea.
    const addTask = () => {
        if (task.trim() === '') {
            return; // No se agrega una tarea vacía o con espacios en blanco.
        } else {
            // Realiza una solicitud POST utilizando Axios.
            axios.post('http://localhost:8000/api/tasks', {
                todo: task,
                isComplete: false
            })
                .then(res => {
                    setTask(""); // Limpia el campo de entrada de tarea.
                    props.addTask(res.data); // Llama a la función 'addTask' pasada como prop.
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='addtask'>
            {/* Campo de entrada para la tarea */}
            <input
                type='text'
                placeholder='Escribir tarea...'
                value={task}
                onChange={event => setTask(event.target.value)}
            />
            {/* Botón para agregar la tarea */}
            <button onClick={() => addTask()}>Agregar</button>
        </div>
    );
}

// Valida la prop 'addTask'
Addtask.propTypes = {
    addTask: PropTypes.func.isRequired // Asegura que 'addTask' sea una función requerida.
};

export default Addtask;
