import { Request,Response } from "express";
import db from "../models";
const postController={
    createPost: async(req:Request,res:Response)=>{
        const {userId} = req.params
        const {title,description,roomType,price,address,acreage,roomImage}=req.body
        try {
            const post = await db.Post.create({
                title,
                description,
                roomType,
                price,
                address,
                acreage,
                userId:userId
            })
            if(roomImage){
                for(const image of roomImage){
                    await db.ImageRoom.create({
                        imageUrl:image,
                        postId:post.id
                    })
                }
            }
            res.status(200).json({message:"Post created successfully"})
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

export default postController;