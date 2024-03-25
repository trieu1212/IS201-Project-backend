
import express,{Request,Response} from 'express';
import db from '../models';
interface UserRequest extends Request{
    body:{
        id:number;
        name:string;
        email:string;
        password:string;
        serviceId:number;
        isAdmin:boolean;
        postAmount:number;
        refreshToken:string;
    },
    params:{
        userId:string
    }
}
interface UserResponse extends Response<any,Record<string,any>>{
    status(code:number): this,
    json(data:any):this
}
const userController:any = {
    //user does
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
    //admin does
    getAllUser: async(req:UserRequest,res:UserResponse) =>{
        try {
            const users = await db.User.findAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    getOneUser: async(req:UserRequest,res:UserResponse)=>{
        const {userId} = req.params
        try {
            const user = await db.User.findByPk(userId)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    updateUserByAdmin: async(req:UserRequest,res:UserResponse)=>{
        const {userId} = req.params
        const {name,email,serviceId,isAdmin,postAmount} = req.body
        try {
            const user = await db.User.update({
                name,
                email,
                serviceId,
                isAdmin,
                postAmount,
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
    deleteUserByAdmin: async(req:UserRequest,res:UserResponse)=>{
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
    }
}

export default userController;