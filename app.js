const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const URI_DB = process.env.URI_DB;

// Establecer la conexión a MongoDB
mongoose.connect(URI_DB, {
  useNewUrlParser: true,         /* Utiliza el nuevo analizador de URL (obligatorio). Esta opción le indica a Mongoose que utilice el nuevo analizador de URL en lugar del analizador de URL antiguo. El analizador de URL se utiliza para analizar la cadena de conexión de MongoDB y extraer información como el nombre de usuario, contraseña, host y nombre de la base de datos. El analizador de URL antiguo estaba sujeto a problemas de desaprobación y advertencias en las versiones más recientes de Node.js y MongoDB. Al establecer esta opción en true, estás asegurándote de que Mongoose utilice el nuevo analizador de URL que es más compatible con las versiones actuales de Node.js y MongoDB. */
  useUnifiedTopology: true,    /* Utiliza el nuevo motor de topología unificada. Esta opción le indica a Mongoose que utilice el nuevo analizador de URL en lugar del analizador de URL antiguo. El analizador de URL se utiliza para analizar la cadena de conexión de MongoDB y extraer información como el nombre de usuario, contraseña, host y nombre de la base de datos. El analizador de URL antiguo estaba sujeto a problemas de desaprobación y advertencias en las versiones más recientes de Node.js y MongoDB. Al establecer esta opción en true, estás asegurándote de que Mongoose utilice el nuevo analizador de URL que es más compatible con las versiones actuales de Node.js y MongoDB. */ 
})
.then(() => {
  // Si la conexión es exitosa, esta función se ejecutará
  console.log('Conexión exitosa a MongoDB');
})
.catch(error => {
  // Si ocurre un error en la conexión, esta función se ejecutará
  console.error('Error de conexión a MongoDB:', error);
});


// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const routes = require('./routes/routes');
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`RUNNING ${PORT}`);
});