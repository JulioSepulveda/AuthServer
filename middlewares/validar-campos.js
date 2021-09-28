const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next ) => {

    /* Control que no se devuelve ningún error en el body del request */
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();

}


module.exports = {
    validarCampos
}