const mongoose = require('mongoose')

//Definie un modelo que solo trabaje con mongo
const courseSchema = new mongoose.Schema({
    title : {
        type:String,
        unique: true,
        required: [true, "El titulo del curso ya esta repetido"],
        minlenght: [10, "El titulo solo debe tener 10 caracteres"],
        maxlenght: [30, "El titulo solo debe tener 30 caracteres"]
    },
    description : {
        type:String,
        required: ["El curso debe tener descripción"],
        minlenght: [10, "El nombre solo debe tener 10 caracteres"]
    },
    weeks : {
        type:Number,
        required: ["El curso debe tener semanas establecidas"],
        max:[9,"Solo se aceptan 9 semanas para el curso"]
    },
    tuition : {
        type:Number,
        required: ["El curso debe tener un precio asignado"]
    },
    minimumSkills : {
        type:[String],
        required:["Debe asignar una habilidad"],
        enum:[ "Benniger" , "Intermediate" , "Advanced", "Expert" ]
    },
    createAt : {
        type: Date,
        required: [true, "Debe ingresarse fecha de creación"]
    }
})

const Course = mongoose.model("Course",courseSchema)

module.exports = Course