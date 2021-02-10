//const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();


// Contectar la base de datos
db.authenticate()
    .then( () => console.log('Base de Datos Conectada'))
    .catch( error => console.log(error))

// Definir puerto

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//req es lo que estas mandando
//res es lo que responde express

//Habilitar PUG

app.set('view engine', 'pug');


//Definir la carpeta publica
app.use(express.static('public'));

//Obtener el año actual     
app.use( (req, res, next) => {

    const year = new Date(); 

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';

    
    next();
        
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded( {extended: true}));



//Configuracion del router
app.use('/', router);

//use incluye todos los verbos del protocolo http


//app.listen(port, () => {
//    console.log(`El servidor esta funcionando en el puerto ${port}`)

//})

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});