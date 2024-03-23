import { Request,Response } from "express";
import db from "../models";
interface IOrder{
    id:number;
    dateStart:string;
    dateEnd:string;
    totalPrice:number;
    serviceId:number;
    userId:number;
}
interface AuthRequest extends Request{
    body:{
        dateStart:string;
        dateEnd:string;
        totalPrice:number;
        serviceId:number;
    },
    params:{
        userId:string,
        orderId:string
    }
}
interface AuthResponse extends Response<any,Record<string,any>>{
    status(code:number):this;
    json(data:any):this;
}
const orderController={
    createOrder:async(req:AuthRequest,res:AuthResponse)=>{
        const {userId} = req.params
        const {dateStart,dateEnd,totalPrice,serviceId} = req.body
        try {
            const order:IOrder = await db.Order.create({
                dateStart,
                dateEnd,
                totalPrice,
                serviceId,
                userId
            }) 
            const user = await db.User.findByPk(userId)
            const service = await db.Service.findByPk(serviceId)
            user.postAmount += service.postAmount
            await user.save()
            res.status(201).json(order)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    getAllUserOrder:async(req:AuthRequest,res:AuthResponse)=>{
        const {userId} = req.params
        try {
            const orders:IOrder = await db.Order.findAll({
                where:{
                    userId
                },
                order:[['createdAt','ASC']]
            })
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

export default orderController