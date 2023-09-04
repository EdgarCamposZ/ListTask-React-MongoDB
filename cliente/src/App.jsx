// Importa los módulos necesarios desde React y Axios.
import { useState, useEffect } from 'react';
import axios from 'axios';

// Importa los estilos CSS y los componentes necesarios.
import './App.css';
import Addtask from './Components/Addtask';
import Todolist from './Components/Todolist';
import Updatetask from './Components/Updatetask';

function App() {
  // Define los estados para almacenar la lista de tareas, la tarea a actualizar y el estado de mostrar el popup.
  const [todolist, setTodolist] = useState([]);
  const [tasktoUpdate, setTasktoUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Utiliza useEffect para cargar las tareas desde el servidor al cargar la página.
  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks')
      .then(res => {
        setTodolist(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Función para agregar una nueva tarea a la lista.
  const addTask = newTask => {
    setTodolist([...todolist, newTask]);
  }

  // Función para marcar una tarea como completa o incompleta.
  const taskComplete = task => {
    const newList = [...todolist];
    newList.forEach(item => {
      if (item._id === task._id) {
        item.isComplete = task.isComplete;
      }
    });
    setTodolist(newList);
  }

  // Función para eliminar una tarea de la lista.
  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id));
    setTodolist(newList);
  }

  // Función para actualizar el contenido de una tarea en la lista.
  const updateTask = task => {
    const newList = [...todolist];
    newList.forEach(item => {
      if (item._id === task._id) {
        item.todo = task.todo;
      }
    });
    setTodolist(newList);
  }

  return (
    <div>
      {/* Componente para agregar una nueva tarea */}
      <Addtask addTask={addTask} />

      {/* Componente para mostrar la lista de tareas */}
      <Todolist
        todolist={todolist}
        taskComplete={taskComplete}
        removeTask={removeTask}
        tasktoUpdate={task => setTasktoUpdate(task)}
        showPopup={() => setShowPopup(!showPopup)}
      />

      {/* Muestra el componente de actualización de tarea si showPopup es verdadero */}
      {showPopup && <Updatetask task={tasktoUpdate} updateTask={updateTask} removePopup={() => setShowPopup(!showPopup)} />}
    </div>
  );
}

export default App;
