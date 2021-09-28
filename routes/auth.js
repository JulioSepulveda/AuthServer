const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* Peticiones. Tienen los parametros request y response. Por ejemplo con response podemos devolver una respuesta cuando se hace 
   la petición. Para enviar el estado podemos poner app.status(404).json.... */

//Crear nuevo usuario
/* El ultimo middleware validarCampos es uno personalizado creado en la carpeta middlewares */
router.post( '/new', [
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria y mínimo de 6 caracteres').isLength({min: 6}),
   validarCampos,
], crearUsuario );

//Login usuario
/* Si queremos meterle validaciones se las ponemos como segundo parametro. Si son varias las creamos como un array */
router.post( '/', [
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria y mínimo de 6 caracteres').isLength({min: 6}),
   validarCampos,
], loginUsuario );

//Validar y revalidar token
 //Tenemos que llamar en el segundo parámetro al middleware que revalida el JWT
router.get( '/renew', validarJWT, revalidarToken );


/* Para exportar un objeto, etc */
module.exports = router;