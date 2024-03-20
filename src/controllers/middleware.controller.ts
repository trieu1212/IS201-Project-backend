import { Request,Response } from "express";
import jwt from 'jsonwebtoken'
interface IUser{
    id:number,
    isAdmin:boolean
}
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
const middlewareController:any = {
    verifyToken: (req:Request,res:Response,next:Function)=>{
        const token = req.headers['authorization']
        const accessToken = token?.split(" ")[1]
        if(!accessToken){
            return res.status(401).json({error:"Token is required"})
        }
        else{
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY || 'trieu',(err:any,user:any)=>{
                if(err){
                    return res.status(403).json({error:"Invalid token"})
                }
                else{
                    const userInterface = user as IUser
                    req.user = userInterface
                    next()
                }
            })
        }
    },
    verifyTokenAndAdmin: (req:Request,res:Response,next:Function)=>{
        middlewareController.verifyToken(req,res,()=>{
            if(req.user?.isAdmin){
                next()
            }
            else{
                return res.status(403).json({error:"You are not allow to do that"})
            }
        })
    },
    verifyTokenAndAuthorite: (req:Request,res:Response,next:Function)=>{
        middlewareController.verifyToken(req,res,()=>{
            if(req.user?.id === Number(req.params.id)){
                next()
            }
            else{
                return res.status(403).json({error:"You are not allow to do that"})
            }
        })
    }
}

export default middlewareController