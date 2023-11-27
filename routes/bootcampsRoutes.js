const express = require('express')
const bootcampModel = require ('../models/bootcampModel')
const router = express.Router()
const mongoose = require ('mongoose')

router.get('/', async (req, res)=>{
    //Traigo todos los bootcamps

    try {
        const bootcamps= await bootcampModel.find()
        if(bootcamps.length === 0){
            res.status(400).json({
                success:false,
                msg:'No hay bootcamps'
            })
        }else{
            res.status(200).json({
                success:true,
                data:bootcamps
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
            const bootcamp = await bootcampModel.findById(req.params.id)
            if(!bootcamp){
                res.status(400).json({
                    success:false,
                    msg:`No existe el bootcamp ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:bootcamp
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
    //Registrar nuevo bootcamp

    try {
        const newBootcamp = await bootcampModel.create(req.body)
        res.status(201).json({
        success:true,
        data:newBootcamp
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
            const bootcamp = await bootcampModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            if(!bootcamp){
                res.status(400).json({
                    success:false,
                    msg:`No existe el bootcamp ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:bootcamp
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
            const bootcamp = await bootcampModel.findByIdAndDelete(req.params.id,req.body,{new:true})
            if(!bootcamp){
                res.status(400).json({
                    success:false,
                    msg:`No existe el bootcamp ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:bootcamp
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
