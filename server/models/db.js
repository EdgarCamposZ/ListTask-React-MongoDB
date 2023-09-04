// Importa el módulo 'mongoose' para interactuar con la base de datos MongoDB.
const mongoose = require('mongoose');

// Realiza una conexión a la base de datos MongoDB utilizando los datos proporcionados.
module.exports = mongoose.connect(
    'mongodb+srv://Minato_user6:Minato1410@cluster0.1nxwikc.mongodb.net/Tareas', // URL de conexión.
    {
        useUnifiedTopology: true, // Habilita el uso de unificado de topología.
        useNewUrlParser: true,    // Habilita el uso de nuevo analizador de URL.
        useFindAndModify: false   // Deshabilita el uso de 'findOneAndUpdate' y 'findOneAndDelete'.
    },
    err => {
        if (err) {
            console.log(`Error en la conexión a la base de datos ${err}`);
        } else {
            console.log(`Conexión exitosa con MongoDB.`);
        }
    }
);
