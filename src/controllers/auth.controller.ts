import db from '../models/index'
import bcrypt from 'bcryptjs'
import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken'
interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: string;
    serviceId: number | null;
    refreshToken: string | null;
    isAdmin: boolean;
}
interface AuthRequest extends Request{
    body:{
        id:number;
        username:string;
        email:string;
        password:string;
        phone:string;
        serviceId:number;
        refreshToken:string;
    }
}
interface AuthResponse extends Response<any,Record<string,any>>{
    status(code:number):this;
    json(data:any):this;
}
const authController:any = {
    generateAccessToken: (user:any)=>{
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin 
        },process.env.JWT_ACCESS_KEY || 'trieu',{expiresIn:'2m'})
    },
    generateRefreshToken: (user:any)=>{
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin 
        },process.env.JWT_REFRESH_KEY || 'trieuhihi',{expiresIn:'7d'})
    },
    register: async(req:AuthRequest,res:AuthResponse)=>{
        const {username,email,password,phone,serviceId} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        try{
            if(serviceId){
                const user:IUser | null = await db.User.create({
                    username,
                    email,
                    password:hashedPassword,
                    phone,
                    serviceId,
                    refreshToken:null
                })
                res.status(200).json(user)
            }
            else{
                const user = await db.User.create({
                    username,
                    email,
                    password:hashedPassword,
                    phone,
                    serviceId:0,
                    refreshToken:null
                })
                res.status(200).json(user)
            }
        }catch(e){
            res.status(500).json({error:e})
        }
    },
    login: async(req:AuthRequest,res:AuthResponse)=>{
        const {username,password} = req.body;
        try {
            if(!username){
                res.status(400).json({error:"Username is required"})
            }
            else{
                const user:IUser|null = await db.User.findOne({where:{username}})
                if(user){
                    const validPassword = bcrypt.compareSync(password,user.password)
                    if(validPassword){
                        const accessToken = authController.generateAccessToken(user)
                        const refreshToken = authController.generateRefreshToken(user)
                        await db.User.update(
                            {refreshToken},
                            {where:{id:user.id}}
                        )
                        const data ={
                            id:user.id,
                            username:user.username,
                            email:user.email,
                            phone:user.phone,
                            serviceId:user.serviceId,

                            isAdmin:user.isAdmin
                        }
                        res.status(200).json({user:data,accessToken,refreshToken})
                    }
                    else{
                        res.status(400).json({error:"Invalid password"})
                    }
                }
                else{
                    res.status(404).json({error:"User not found"})
                }
            }
        } catch (error) {
            
        }
    },
    refresh: async(req:AuthRequest,res:AuthResponse)=>{
        const refreshToken = req.body.refreshToken
        if(!refreshToken){
            res.status(401).json({message:"Token is required"})
        }
        else{
            const user:IUser|null = await db.User.findOne({where:{refreshToken}})
            if(!user){
                res.status(403).json({message:"Invalid token"})
            }
            else{
                jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY || 'trieuhihi',async(err:any,decoded:any)=>{
                    if(err){
                        res.status(403).json({message:"Wrong token"})
                    }
                    else{
                        const newAccessToken = authController.generateAccessToken(decoded)
                        const newRefreshToken = authController.generateRefreshToken(decoded)
                        await db.User.update(
                            { refreshToken: newRefreshToken },
                            { where: { id: user.id } }
                        );
                        res.status(200).json({accessToken:newAccessToken,refreshToken:newRefreshToken})
                    }
                })
            }
        }
    },
    logout: async(req:AuthRequest,res:AuthResponse)=>{
        const refreshToken = req.body.refreshToken
        await db.User.update(
            {refreshToken:null},
            {where:{refreshToken}}
        )
        res.status(200).json({message:"Logout successfully"})
    }
}


export default authController;