import { userModel } from "../models/user.model";
import express,{Request,Response} from 'express';
const userController = {
    getAllUser: async(req:Request,res:Response)=>{
        try {
            const users = await userModel.findAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

export default userController;