const express = require('express');
const path = require('path');
const app = express();

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