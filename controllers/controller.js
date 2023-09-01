// multer: Librería de Node.js que se utiliza para gestionar la carga de archivos en aplicaciones web.
const multer = require('multer');
// fs: Módulo incorporado en Node.js que proporciona funcionalidades para trabajar con el sistema de archivos.
const fs = require('fs');

const File = require('../models/file');

// diskStorage: Uno de los métodos de almacenamiento proporcionados por Multer. Define cómo y dónde se guardarán los archivos subidos en el disco.
const storage = multer.diskStorage({
  // destination: Función de configuración para diskStorage que determina la carpeta de destino donde se guardarán los archivos.
  // cb: Abreviatura de "callback". Es una función que se pasa como argumento a otra función para que sea llamada en algún momento en el futuro.
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  // filename: Función de configuración para diskStorage que define el nombre del archivo almacenado. En este caso, utiliza el tiempo actual en milisegundos para generar un nombre único.
  // file: Objeto que contiene información sobre el archivo subido. Proporciona detalles como el nombre original del archivo, el tipo MIME, etc.
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

/* multer: Módulo importado previamente. Este módulo proporciona funcionalidades para manejar la carga de archivos.
{ storage: storage }: Aquí se está pasando un objeto de configuración a Multer. El objeto tiene una propiedad llamada storage a la que se le está asignando el valor de la constante storage.
storage: Esta es una configuración crítica en Multer que especifica cómo y dónde se guardarán los archivos que se carguen en la aplicación. Especifica que se está utilizando el método de almacenamiento en disco (diskStorage) definido en la constante storage.
 */
const upload = multer({ storage: storage });

// El objeto vacío, controller, actúa como un contenedor para todas las funciones relacionadas con el controlador. Cada función se agrega al objeto como propiedades
const controller = {};

controller.getIndexPage = (req, res) => {
  const uploadDir = 'public/uploads/';
  // readdir: Método del módulo fs que se utiliza para leer de forma asíncrona el contenido de un directorio. Retorna una lista de nombres de archivos y carpetas presentes en el directorio especificado.
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error al leer los archivos:', err);
      return res.render('index', { files: [] }); // Este es un objeto que se pasa como datos a la plantilla 'index'. La propiedad 'files' tiene un valor de un array vacío.
    }

    res.render('index', { files });
  });
};

// controller.uploadFile = [
//   // upload.single('file'): Middleware de Multer que se utiliza para manejar una sola carga de archivo con el nombre file. La información del archivo subido estará disponible en req.file.
//   upload.single('file'),
//   (req, res) => {
//     res.redirect('/'); // Redirigir a la página principal
//   }
// ];

if (!File) {
  const File = require('../models/file'); // Importa el modelo de archivo
}

controller.uploadFile = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No se ha subido ningún archivo.');
    }

    // Crear un nuevo documento en MongoDB utilizando el modelo File
    const newFile = new File({
      originalName: req.file.originalname,
      // El tipo Extensiones multipropósito de Correo de Internet (MIME) es una forma estandarizada de indicar la naturaleza y el formato de un documento, archivo o conjunto de datos
      mimeType: req.file.mimetype,
      path: req.file.path // Esto es el path en el sistema de archivos local, podrías ajustarlo según tus necesidades
    });

    try {
      await newFile.save(); // Guardar el documento en la base de datos
      res.redirect('/');
    } catch (error) {
      console.error('Error al guardar el archivo en MongoDB:', error);
      res.status(500).send('Error al guardar el archivo en la base de datos.');
    }
  }
];


module.exports = controller;
