// Importación de las bibliotecas necesarias
const multer = require('multer'); // Biblioteca Multer para la gestión de archivos
const path = require('path'); // Módulo path para trabajar con rutas de archivos

// Configuración de la estrategia de almacenamiento de archivos
const storage = multer.diskStorage({
  // La propiedad "destination" determina la carpeta donde se guardarán los archivos subidos.
  // Utiliza la ruta absoluta proporcionada por __dirname y la agrega a '../public/uploads/'.
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },

  // La propiedad "filename" determina el nombre del archivo en el sistema de archivos.
  // En este caso, se utiliza la fecha actual en milisegundos como prefijo y el nombre original del archivo.
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Configuración del middleware Multer con la estrategia de almacenamiento definida anteriormente.
const upload = multer({ storage: storage });

// Exportación del middleware para su uso en otras partes de la aplicación.
module.exports = upload;
