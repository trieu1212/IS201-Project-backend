'use strict';
import { Model } from 'sequelize';
type ImageRoomAttributes = {
  imageUrl: string,
  postId:number,
};
module.exports = (sequelize:any, DataTypes:any) => {
  class ImageRoom extends Model<ImageRoomAttributes> implements ImageRoomAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    imageUrl!: string
    postId!:number
    static associate(models:any) {
      // define association here
      ImageRoom.hasOne(models.Post)
    }
  }
  ImageRoom.init({
    imageUrl: DataTypes.STRING,
    postId:DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'ImageRoom',
    tableName: 'imageroom'
  });
  return ImageRoom;
};