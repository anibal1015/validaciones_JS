const mongoose = require('mongoose')
const color = require('colors')

//Crear la funcion de conexión

const conectarDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB conectado...'.blue)
}

module.exports = conectarDB