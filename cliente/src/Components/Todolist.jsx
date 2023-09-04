// Importa los estilos CSS específicos para el componente Todolist.
import './Todolist.css';

// Importa React y los iconos de Material-UI.
import CheckIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// Importa el módulo Axios para realizar solicitudes HTTP.
import axios from 'axios';

// Importa PropTypes para validar las props.
import PropTypes from 'prop-types';

// Componente funcional Todolist.
function Todolist(props) {
    // Mapea las tareas en la lista y crea elementos de lista para cada tarea.
    const todolist = props.todolist.map((task, index) => {
        // Función para marcar una tarea como completa o incompleta.
        const taskComplete = task => {
            axios.put(`http://localhost:8000/api/tasks/${task._id}`, {
                _id: task._id,
                todo: task.todo,
                isComplete: !task.isComplete
            })
                .then(res => props.taskComplete(res.data))
                .catch(err => console.log(err));
        }

        // Función para eliminar una tarea.
        const removeTask = id => {
            axios.delete(`http://localhost:8000/api/tasks/${id}`)
                .then(res => props.removeTask(res.data))
                .catch(err => console.log(err));
        }

        return (
            <li key={index}>
                <div style={{ display: 'flex' }}>
                    {/* Icono de marca de verificación (CheckIcon) */}
                    <CheckIcon className={task.isComplete ? 'isComplete' : 'checkicon'} />
                    {/* Texto de la tarea */}
                    <p className={task.isComplete ? 'taskcomplete' : ''} onClick={() => taskComplete(task)}>
                        {task.todo}
                    </p>
                </div>
                <div>
                    {/* Icono de edición (EditIcon) */}
                    <EditIcon
                        className='edit'
                        onClick={() => {
                            props.tasktoUpdate(task);
                            props.showPopup();
                        }}
                    />
                    {/* Icono de cierre (CloseIcon) */}
                    <CloseIcon className='close' onClick={() => removeTask(task._id)} />
                </div>
            </li>
        );
    });

    return (
        <div className='tasklist'>
            <ul>{todolist}</ul>
        </div>
    );
}

// Valida las props requeridas y sus tipos.
Todolist.propTypes = {
    todolist: PropTypes.array.isRequired, // Un array de tareas
    taskComplete: PropTypes.func.isRequired, // Función para marcar una tarea como completa/incompleta
    removeTask: PropTypes.func.isRequired, // Función para eliminar una tarea
    tasktoUpdate: PropTypes.func.isRequired, // Función para actualizar una tarea
    showPopup: PropTypes.func.isRequired // Función para mostrar un popup
};

export default Todolist;
