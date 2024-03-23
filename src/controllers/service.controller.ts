import { Request,Response } from "express";
import db from "../models";
interface IService{
    id:number;
    name:string;
    description:string;
    dateTime:string;
    price:number;
    postAmount:number;
}
interface AuthRequest extends Request{
    body:{
        id:number;
        name:string;
        description:string;
        dateTime:string;
        price:number;
        postAmount:number;
    },
    params:{
        serviceId:number,
        userId:number
    }
}
interface AuthResponse extends Response<any,Record<string,any>>{
    status(code:number):this;
    json(data:any):this;
}
const serviceController ={
    createService:async(req:AuthRequest,res:AuthResponse)=>{
        const {name,description,dateTime,price,postAmount} = req.body;
        try {
            const service:IService|null = await db.Service.create({
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
    updateService: async(req:AuthRequest,res:AuthResponse)=>{
        const {serviceId}=req.params;
        const {name,description,dateTime,price,postAmount} = req.body;
        try {
            const service:IService|null = await db.Service.update({
                name,
                description,
                dateTime,
                price,
                postAmount
            },{
                where:{
                    id:serviceId
                }
            })
            res.status(200).json(service)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    deleteService: async(req:AuthRequest,res:AuthResponse)=>{
        const {serviceId}=req.params;
        try {
            const service:IService|null = await db.Service.destroy({
                where:{
                    id:serviceId
                }
            })
            res.status(200).json(service)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    getAllService: async(req:AuthRequest,res:AuthResponse)=>{
        try {
            const services:IService|null = await db.Service.findAll()
            res.status(200).json(services)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
}

export default serviceController;