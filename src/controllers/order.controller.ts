import { Request,Response } from "express";
import db from "../models";

const orderController={
    createOrder:async(req:Request,res:Response)=>{
        const {userId} = req.params
        const {dateStart,dateEnd,totalPrice,serviceId} = req.body
        try {
            const order = await db.Order.create({
                dateStart,
                dateEnd,
                totalPrice,
                serviceId,
                userId
            })
            res.status(201).json(order)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    getAllUserOrder:async(req:Request,res:Response)=>{
        const {userId} = req.params
        try {
            const orders = await db.Order.findAll({
                where:{
                    userId
                },
                sort:[['createdAt','ASC']]
            })
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

export default orderController