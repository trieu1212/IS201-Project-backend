import db from '../models/index'
import bcrypt from 'bcryptjs'
import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken'
let refreshTokens:Array<string> = []
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
    register: async(req:Request,res:Response)=>{
        const {username,email,password,phone,serviceId} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        try{
            if(serviceId){
                const user = await db.User.create({
                    username,
                    email,
                    password:hashedPassword,
                    phone,
                    serviceId
                })
                res.status(200).json(user)
            }
            else{
                const user = await db.User.create({
                    username,
                    email,
                    password:hashedPassword,
                    phone,
                    serviceId:0
                })
                res.status(200).json(user)
            }
        }catch(e){
            res.status(500).json({error:e})
        }
    },
    login: async(req:Request,res:Response)=>{
        const {username,password} = req.body;
        try {
            if(!username){
                res.status(400).json({error:"Username is required"})
            }
            else{
                const user = await db.User.findOne({where:{username}})
                if(user){
                    const validPassword = bcrypt.compareSync(password,user.password)
                    if(validPassword){
                        const accessToken = authController.generateAccessToken(user)
                        const refreshToken = authController.generateRefreshToken(user)
                        const {password,...userInfo} = user.dataValues
                        res.status(200).json({userInfo,accessToken,refreshToken})
                        refreshTokens.push(refreshToken)
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
    refresh: async(req:Request,res:Response)=>{
        
    }
}


export default authController;