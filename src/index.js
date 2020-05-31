const express = require('express');
const path = require('path');///Unir carpetas
const multer = require('multer'); // para subir las imagenes
//const uuid = require('uuid')//genera un id unico
var uuid = require('uuid');


///Inicializar 
const app = express();

//Configuraciones
app.set('port',3000);
app.set('views',path.join(__dirname,'views'));////Le indica donde esta la carpeta views
app.set('view engine','ejs');

///// middleeares(Se ejecuta antes de llegar a las rutas). Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname,'/public/uploads'),
    filename:(req, file,cb) => {
        cb(null,uuid.v4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});
///Donde conlar los archivos
const upload = multer({
    storage,
    dest: path.join(__dirname,'public/uploads'),
    limits: {fileSize: 5000000},
    fileFilter:(req,file,cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype.toLocaleLowerCase());
        const extName = fileTypes.test(path.extname(file.originalname.toLocaleLowerCase()));
        if (mimeType && extName){
            return cb(null,true);
        }
        cb("Error: Archivo debe ser una imagen valida");

    }
    
}).single('imageInput');
app.use(upload);


///Rutas
app.use(require('./routes/index.routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));
//Iniciar el servidor
app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`)

});

