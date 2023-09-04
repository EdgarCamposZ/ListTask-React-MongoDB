// Importa el módulo 'express' para crear un servidor web.
const express = require('express');

// Importa el modelo 'Task' desde el archivo '../models/models'.
const Task = require('../models/models');

// Crea un enrutador utilizando Express.
const router = express.Router();

// Ruta GET para obtener todas las tareas.
router.get('/', (req, res) => {
    // Utiliza el método 'Task.find' para buscar todas las tareas en la base de datos.
    Task.find((err, docs) => {
        if (err) console.log(err); // Si hay un error, imprímelo en la consola.
        res.json(docs); // Responde con un JSON que contiene las tareas encontradas.
    });
});

// Ruta POST para agregar una nueva tarea.
router.post('/', (req, res) => {
    // Crea una nueva instancia de 'Task' utilizando los datos en 'req.body'.
    const task = new Task(req.body);

    // Utiliza el método 'task.save' para guardar la nueva tarea en la base de datos.
    task.save((err, doc) => {
        if (err) console.log(err); // Si hay un error, imprímelo en la consola.
        res.json(doc); // Responde con un JSON que contiene la tarea recién creada.
    });
});

// Ruta PUT para actualizar una tarea existente.
router.put('/:id', (req, res) => {
    // Utiliza 'Task.findOneAndUpdate' para encontrar y actualizar la tarea por su '_id'.
    Task.findOneAndUpdate(
        {
            _id: req.params.id // El parámetro ':id' en la URL identifica la tarea.
        },
        req.body, // Utiliza los datos en 'req.body' para actualizar la tarea.
        {
            new: true // Devuelve los datos actualizados en la respuesta.
        },
        (err, doc) => {
            if (err) console.log(err); // Si hay un error, imprímelo en la consola.
            res.json(doc); // Responde con un JSON que contiene la tarea actualizada.
        }
    );
});

// Ruta DELETE para eliminar una tarea.
router.delete('/:id', (req, res) => {
    // Utiliza 'Task.findByIdAndDelete' para buscar y eliminar la tarea por su '_id'.
    Task.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) console.log(err); // Si hay un error, imprímelo en la consola.
        res.json(doc); // Responde con un JSON que contiene la tarea eliminada.
    });
});

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
