'use strict';
import { Model } from 'sequelize';
type UserAttributes = {
  username: string,
  password: string,
  email: string,
  phone:number,
  postAmount:number,
  isAdmin:boolean,
  serviceId:number,
  refreshToken?:string
};
module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    username!: string;
    password!: string;
    email!: string;
    phone!:number;
    postAmount!:number;
    isAdmin!:boolean;
    serviceId!:number;
    refreshToken!:string;
    static associate(models:any) {
      // define association here
      User.hasOne(models.Post)
      User.hasMany(models.Order)
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone:DataTypes.INTEGER,
    postAmount:DataTypes.INTEGER,
    isAdmin:DataTypes.BOOLEAN,
    serviceId:DataTypes.INTEGER,
    refreshToken:DataTypes.STRING
  },{
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};