const jwt = require('jsonwebtoken');

/* El JWT está formado por header, payload y la firma */
const generarJWT = ( uid, name ) => {

    const payload = { uid, name };

    /* Con la creación de la siguiente promesa, podemos convertir en sign() del JWT en una promesa para así poderlo devolver al
       método que lo haya llamado */
    return new Promise ( (resolve, reject) => {
        /* El parámetro SECRET_JWD_SEED está creado en las variables de entorno. La creamos nosotros poniendo u texto complicado */
            jwt.sign( payload, process.env.SECRET_JWD_SEED, {
                /* Con expiresIn indicamos el tiempo en el que tenemos que renovar el JWT */
                expiresIn: '24h'
            }, 
            ( err, token ) => {
                if ( err ) {
                    console.log(err);
                    reject( err );
                } else {
                    resolve( token );
                }
            });
    });
}

module.exports = { generarJWT }