
const express = require('express')
const courseModel = require ('../models/courseModel')
const router = express.Router()
const mongoose = require ('mongoose')

router.get('/', async (req, res)=>{
    //Traigo todos los bootcamps

    try {
        const course= await courseModel.find()
        if(course.length === 0){
            res.status(400).json({
                success:false,
                msg:'No hay courses'
            })
        }else{
            res.status(200).json({
                success:true,
                data:course
            })  
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            data:`Error interno del servidor ${error.message}`
        })  
        
    }
})

router.get('/:id', async(req, res)=>{
    //Trer bootcamp por id
    try {
        //validar id para mongo
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({
                success:false,
                msg:`Id invalido`
            })
        }else{
            const course = await courseModel.findById(req.params.id)
            if(!course){
                res.status(400).json({
                    success:false,
                    msg:`No existe el course ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:course
                })  
            }
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            data:`Error interno del servidor ${error.message}`
        })  
    }
})

router.post('/', async(req, res)=>{
    //Registrar nuevo course

    try {
        const newCourse = await courseModel.create(req.body)
        res.status(201).json({
        success:true,
        data:newCourse
    })  
    } catch (error) {
        res.status(500).json({
            success:false,
            data:`${error.message}`
        })  
    }


})

router.put('/:id', async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){

            res.status(400).json({
                success:false,
                msg:`Id invalido`
            })
        }else{
            const course = await courseModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            if(!course){
                res.status(400).json({
                    success:false,
                    msg:`No existe el course ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:course
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            data:`${error.message}`
        })  
    }
})

router.delete('/:id', async(req, res)=>{

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            
            res.status(400).json({
                success:false,
                msg:`Id invalido`
            })
        }else{
            const course = await courseModel.findByIdAndDelete(req.params.id,req.body,{new:true})
            if(!course){
                res.status(400).json({
                    success:false,
                    msg:`No existe el course ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:course
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            data:`${error.message}`
        })  
    }
})

module.exports= router
