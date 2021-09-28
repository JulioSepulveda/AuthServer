
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
/* Esto nos sirve para que en las variables de entorno se usen las declaradas en el fichero que hemos creado .env */
require('dotenv').config();

/* Con este comando podemos ver las variables de entorno que se están utilizando */
/* console.log(process.env); */

//Crear el servidor/aplicacion de express
const app = express();

//Base de datos
dbConnection();

/* Directorio público --> con este comando llamamos al directorio public que hemos creado el cual contine la información para nuestra 
   página web por defecto */
app.use( express.static('public') );

/* MIDDLEWARES */

//CORS --> 
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

/* Rutas. Importamos el middleware que contiene las rutas
Con este comando lo que indicamos es que cuando la url empiece por /api/auth va a devolver alguno de las rutas que hemos 
especificado en el fichero auth.js de la carpeta routes. Por ejemplo localhost:4000/api/auth/renew */
app.use( '/api/auth', require('./routes/auth') )

/* El primer parametro es para especificar el puerto en el que queremos que corra la app. (Nunca usar el 4200 que es el que
   usa Angular) */
/* En vez de poner 4000 a pelo para indicar el puerto, lo recogemos de la variable de entorno creada en el fichero .env */
app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});