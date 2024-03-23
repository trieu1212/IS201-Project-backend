import { Request, Response } from "express";
import db from "../models";
interface IPost {
  id: number;
  title: string;
  description: string;
  roomType: string;
  price: number;
  address: string;
  acreage: number;
  userId: number;
}
interface AuthRequest extends Request {
  body: {
    title: string;
    description: string;
    roomType: string;
    price: number;
    address: string;
    acreage: number;
    roomImage: string[];
  };
  params: {
    userId: string;
    postId: string;
  };
}
interface AuthResponse extends Response<any, Record<string, any>> {
  status(code: number): this;
  json(data: any): this;
}
const postController = {
  createPost: async (req: AuthRequest, res: AuthResponse) => {
    const { userId } = req.params;
    const { title, description, roomType, price, address, acreage, roomImage } =
      req.body;
    try {
      const post:IPost = await db.Post.create({
        title,
        description,
        roomType,
        price,
        address,
        acreage,
        userId: userId,
      });
      if (roomImage) {
        for (const image of roomImage) {
          await db.ImageRoom.create({
            imageUrl: image,
            postId: post.id,
          });
        }
      }
      res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getAllPost: async (req: AuthRequest, res: AuthResponse) => {
    try {
      const posts:IPost = await db.Post.findAll({
        include: [
          {
            model: db.User,
            attributes: ["id", "username", "email", "phone"],
            include: [
                {
                    model: db.Service, 
                    attributes: ["id", "name", "price"],
                    order:[["price", "DESC"]]
                },
            ]
          },
          {
            model: db.ImageRoom,
            attributes: ["id", "imageUrl"],
          },
        ],
        attributes: [
          "id",
          "title",
          "description",
          "roomType",
          "price",
          "address",
          "acreage",
          "createdAt",
        ],
        order: [
          ["createdAt", "ASC"],
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default postController;
