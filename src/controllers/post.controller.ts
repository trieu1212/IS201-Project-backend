import { Request, Response } from "express";
import db from "../models";
const postController = {
  createPost: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { title, description, roomType, price, address, acreage, roomImage } =
      req.body;
    try {
      const post = await db.Post.create({
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
  getAllPost: async (req: Request, res: Response) => {
    try {
      const posts = await db.Post.findAll({
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
