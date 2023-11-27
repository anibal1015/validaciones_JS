const express = require('express')
const reviewModel = require ('../models/reviewModel')
const router = express.Router()
const mongoose = require ('mongoose')

router.get('/', async (req, res)=>{
    //Traigo todos los bootcamps

    try {
        const review= await reviewModel.find()
        if(review.length === 0){
            res.status(400).json({
                success:false,
                msg:'No hay reviews'
            })
        }else{
            res.status(200).json({
                success:true,
                data:review
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
            const review = await reviewModel.findById(req.params.id)
            if(!review){
                res.status(400).json({
                    success:false,
                    msg:`No existe el review ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:review
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
        const newReview = await reviewModel.create(req.body)
        res.status(201).json({
        success:true,
        data:newReview
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
            const review = await reviewModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            if(!review){
                res.status(400).json({
                    success:false,
                    msg:`No existe el review ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:review
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
            const review = await reviewModel.findByIdAndDelete(req.params.id,req.body,{new:true})
            if(!review){
                res.status(400).json({
                    success:false,
                    msg:`No existe el review ${req.params.id}`
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:review
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
