const mongoose = require("mongoose");
const { Schema } = require("mongoose");

/* Esquema de la BBDD */
/* El archivo se llama en singular y con la primera letra en mayúscula */
const usuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

//Exportarlo por defecto
module.exports = mongoose.model('Usuario', usuarioSchema);