const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    /* Constante que lee el parámetro x-token de la cabecera de la llamada */
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {
        
        /* Para veificar el jwt, tenemos que pasar nuestra palabra secreta */
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWD_SEED );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    //Si todo bien
    next();
    

}

module.exports = {
    validarJWT
}