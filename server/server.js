// Importa el módulo 'express' para crear un servidor web.
const express = require('express');

// Importa el módulo 'cors' para habilitar CORS en el servidor.
const cors = require('cors');

// Importa el enrutador definido en el archivo './routes/routes'.
const router = require('./routes/routes');

// Crea una instancia de la aplicación Express.
const app = express();

// Importa y establece la conexión a la base de datos desde el archivo './models/db'.
require('./models/db');

// Configura Express para que pueda interpretar JSON en las solicitudes.
app.use(express.json());

// Habilita CORS en el servidor.
app.use(cors());

// Asocia el enrutador '/api/tasks' con las rutas definidas en './routes/routes'.
app.use('/api/tasks', router);

// Inicia el servidor en el puerto 8000.
app.listen(8000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Servidor iniciado en el puerto: 8000');
    }
});
