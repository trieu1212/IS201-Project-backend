import { userModel } from '../models/user.model';
import bcrypt from 'bcryptjs'
import express,{Request,Response} from 'express';

const authController = {
    register: async(req:Request,res:Response)=>{
        const {username,email,password,serviceId} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        try{
            const user = await userModel.create({
                username,
                email,
                password:hashedPassword,
                serviceId
            })
            res.status(200).json(user)
        }catch(e){
            res.status(500).json({error:e})
        }
    }
}


export default authController;