'use strict';
import { Model } from 'sequelize';
type UserAttributes = {
  username: string,
  password: string,
  email: string,
  serviceId:number,
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
    serviceId!:number;
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
    serviceId:DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};