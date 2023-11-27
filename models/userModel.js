const mongoose = require('mongoose')

//Definie un modelo que solo trabaje con mongo
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        unique: true,
        required:[true,"Se requiere nombre del usuario"],
        maxlength:[20,"El nombre del usuario supera el limite de caracteres (20)"]
    },
    email: {
        type:String,
        unique: true,
        required:[true,"Es requeriddo el correo"],
        
    },
    address: {
        type:String,
        required:[true,"Dirección requerida"],
    },
    rol: String,
    password: {
        type:String,
        required:["La contraseña es requerida"]
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User