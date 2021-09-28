//Para indicar el tipado que devuelve
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../utilidades/jwt');

/* EL = response es para saber que tipo devuelve esa variable pero no es necesario */
/* El await solo funciona con una funcion asincrona */
const crearUsuario = async( req, res = response ) => {

    //Recogemos lo recibido del body desestructuradolo en variables
    const { email, name, password } = req.body;

    try {
        //Verificar el email
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email.'
            });
        }

        //Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        //Hashear la contraseña (encriptar la contraseña)
        /* genera los números de la contraseña. Con esto es imposible descifrar la contraseña */
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        //Generar el JWT (Json Web Token)
        const token = await generarJWT( dbUser.id, name );



        //Crear usuario de BBDD
        await dbUser.save()

        //Generar respuesta exitosa

        /* El estado 200 y pico es que ha ido bien */
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });  
    }

    

    
}

const loginUsuario = async(req, res = response ) => {

     //Recogemos lo recibido del body desestructuradolo en variables
     const { email, password } = req.body;

     try {
        const dbUser = await Usuario.findOne({ email });

        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe' 
            });
        }

        /* Confirmar si el password es correcto */
        const validPwd = bcrypt.compareSync( password, dbUser.password );

        if ( !validPwd ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido' 
            }); 
        }

        /* Si el password es correcto generamos el JWT */
        const token = await generarJWT( dbUser.id, dbUser.name );

        /* Respuesta del servicio */
        return res.json({
            ok: true,
            uid: dbUser.uid,
            name: dbUser.name,
            token
        }); 
         
     } catch (error) {
         console.log(error);
         return res.json({
             ok: false,
             msg: 'Hable con el administrador'
         });
     }
}

const revalidarToken = async(req, res) => {

    const { uid, name } = req;
    
    //Generar un nuevo JWT (Json Web Token)
    const token = await generarJWT( uid, name );

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}


/* Para exportar las funciones */
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}