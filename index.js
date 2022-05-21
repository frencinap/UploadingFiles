//importación de modulos y variables globales
const express = require('express');
const app = express();
const PORT = 3000;
const fileupload = require('express-fileupload');
const fs = require('fs');

//middleware express para json y archivos estaticos
app.use(express.json());
app.use('/imgs', express.static('imgs'))

//levantar servidor
app.listen(PORT, console.log(
    `Servidor disponible en puerto http://localhost:${PORT}`
))

//parametros subida de archivos
app.use(fileupload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El archivo supera el limite permitido"
}))

//rutas principales
app.get('/', (req,res)=>{
    res.sendFile(`${__dirname}/formulario.html`)
})
app.get('/collage', (req,res)=>{
    res.sendFile(`${__dirname}/collage.html`)
})

//subir imagen 
app.post('/imagen', (req,res)=>{
    const { target_file } = req.files;
    const { posicion } = req.body;
    const img = `imagen-${posicion}.jpg`;
    target_file.mv(`${__dirname}/imgs/${img}`, (err) => {
        res.send( err ? 'Ocurrió un error subiendo archivo' : 'Archivo cargado con éxito')
    })
})

//borrar imagen, seguí el método según el link del archivo collage.html
app.get('/deleteImg/:nombre', (req,res)=>{
    const { nombre } = req.params;
    console.log(nombre)
    fs.unlink(`${__dirname}/imgs/${nombre}`, (err) => {
        res.send(err ? 'Ha ocurrido un error' : 'Imagen eliminada con éxito');
    })
})