const express = require('express')
const userModel = require ('../models/userModel')
const router = express.Router()
const mongoose = require ('mongoose')

router.get('/', async (req, res)=>{
    //Traigo todos los bootcamps

    try {
        const user= await userModel.find()
        if(user.length === 0){
            res.status(400).json({
                success:false,
                msg:'No hay user'
            })
        }else{
            res.status(200).json({
                success:true,
                data:user
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
            const user = await userModel.findById(req.params.id)
            if(!user){
                res.status(400).json({
                    success:false,
                    msg:`No existe el user ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:user
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
    //Registrar nuevo review

    try {
        const newUser = await userModel.create(req.body)
        res.status(201).json({
        success:true,
        data:newUser
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
            const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            if(!user){
                res.status(400).json({
                    success:false,
                    msg:`No existe el user ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:user
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
            const user = await userModel.findByIdAndDelete(req.params.id,req.body,{new:true})
            if(!user){
                res.status(400).json({
                    success:false,
                    msg:`No existe el user ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:user
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
