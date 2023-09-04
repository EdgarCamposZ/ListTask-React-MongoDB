// Importa el módulo 'mongoose' para interactuar con la base de datos MongoDB.
const mongoose = require('mongoose');

// Define un esquema (estructura) para el modelo 'Task'.
const TaskSchema = new mongoose.Schema({
    todo: String,         // Campo para almacenar la descripción de la tarea.
    isComplete: Boolean   // Campo para indicar si la tarea está completa o no.
});

// Crea un modelo 'Task' utilizando el esquema definido anteriormente.
const Task = mongoose.model('task', TaskSchema);

// Exporta el modelo 'Task' para que pueda ser utilizado en otras partes de la aplicación.
module.exports = Task;
