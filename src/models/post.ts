'use strict';
import { Model } from 'sequelize';
type PostAttributes = {
  title: string,
  description: string,
  status: boolean,
  roomType:string,
  price:number,
  address:string,
  acreage:number,
  userId:number,
};
module.exports = (sequelize:any, DataTypes:any) => {
  class Post extends Model<PostAttributes> implements PostAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    title!: string
    description!: string
    status!: boolean
    roomType!:string
    price!:number
    address!:string
    acreage!:number
    userId!:number
    static associate(models:any) {
      // define association here
      Post.belongsTo(models.User)
      Post.hasMany(models.ImageRoom)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    roomType:DataTypes.STRING,
    price:DataTypes.INTEGER,
    address:DataTypes.STRING,
    acreage:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'Post',
    tableName: 'post'
  });
  return Post;
};