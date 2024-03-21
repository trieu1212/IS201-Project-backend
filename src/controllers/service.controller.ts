import { Request,Response } from "express";
import db from "../models";

const serviceController ={
    createService:async(req:Request,res:Response)=>{
        const {name,description,dateTime,price,postAmount} = req.body;
        try {
            const service = await db.Service.create({
                name,
                description,
                dateTime,
                price,
                postAmount
            })
            res.status(200).json(service)
        } catch (e) {
            res.status(500).json({message:e})
        }
    },
    updateService: async(req:Request,res:Response)=>{
        const {id}=req.params;
        const {name,description,dateTime,price,postAmount} = req.body;
        try {
            const service = await db.Service.update({
                name,
                description,
                dateTime,
                price,
                postAmount
            },{
                where:{
                    id
                }
            })
            res.status(200).json(service)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    deleteService: async(req:Request,res:Response)=>{
        const {id}=req.params;
        try {
            const service = await db.Service.destroy({
                where:{
                    id
                }
            })
            res.status(200).json(service)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    getAllService: async(req:Request,res:Response)=>{
        try {
            const services = await db.Service.findAll()
            res.status(200).json(services)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
}

export default serviceController;