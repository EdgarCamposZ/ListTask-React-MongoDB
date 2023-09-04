// Importa los estilos CSS específicos para el componente Updatetask.
import './Updatetask.css';

// Importa React y el módulo useState.
import { useState } from 'react';

// Importa el módulo Axios para realizar solicitudes HTTP.
import axios from 'axios';

// Importa PropTypes para validar las props.
import PropTypes from 'prop-types';

// Componente funcional Updatetask.
function Updatetask(props) {
    // Define el estado para almacenar la tarea que se está actualizando.
    const [task, setTask] = useState(props.task.todo);

    // Función para actualizar una tarea.
    const updateTask = () => {
        if (task.trim() === '' || props.task.todo === task) {
            props.removePopup(); // Cierra la ventana emergente si la tarea está vacía o no se ha modificado.
        } else {
            axios.put(`http://localhost:8000/api/tasks/${props.task._id}`, {
                _id: props.task._id,
                todo: task,
                isComplete: props.task.isComplete
            })
                .then(res => {
                    props.removePopup(); // Cierra la ventana emergente después de una actualización exitosa.
                    props.updatetask(res.data); // Llama a la función 'updatetask' pasada como prop.
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='popup'>
            <div className='popup-content'>
                {/* Campo de entrada para la tarea actualizada */}
                <input
                    type='text'
                    placeholder='Actualizar tarea...'
                    value={task}
                    onChange={event => setTask(event.target.value)}
                />
                {/* Botón para actualizar la tarea */}
                <button onClick={() => updateTask()}>Actualizar</button>
            </div>
        </div>
    );
}

// Valida las props requeridas y sus tipos.
Updatetask.propTypes = {
    task: PropTypes.object.isRequired, // Objeto que representa la tarea a actualizar
    removePopup: PropTypes.func.isRequired, // Función para cerrar la ventana emergente
    updatetask: PropTypes.func.isRequired // Función para actualizar la tarea
};

export default Updatetask;
