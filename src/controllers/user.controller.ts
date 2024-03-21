
import express,{Request,Response} from 'express';
import db from '../models';
const userController:any = {
    getUser: async(req:Request,res:Response)=>{
        const {userId} = req.params
        try {
            const user = await db.User.findByPk(userId)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    updateUser: async(req:Request,res:Response)=>{
        const {userId} = req.params
        const {name,email,password} = req.body
        try {
            const user = await db.User.update({
                name,
                email,
                password
            },{
                where:{
                    id:userId
                }
            })
            res.status(200).json({message:"User has been updated"})
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    deleteUser: async(req:Request,res:Response)=>{
        const {userId} = req.params
        try {
             await db.User.destroy({
                where:{
                    id:userId
                }
            })
            res.status(200).json({message:"User has been deleted"})
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
}

export default userController;