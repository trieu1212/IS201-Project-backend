'use strict';
import { Model } from 'sequelize';
type ServiceAttributes = {
  name: string,
  description: string,
  dateTime: number,
  price:number,
  postAmount:number,
};
module.exports = (sequelize:any, DataTypes:any) => {
  class Service extends Model<ServiceAttributes> implements ServiceAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string
    description!: string
    dateTime!: number
    price!:number
    postAmount!:number
    static associate(models:any) {
      // define association here
      Service.hasMany(models.Order)
    }
  }
  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    dateTime: DataTypes.INTEGER,
    price:DataTypes.INTEGER,
    postAmount:DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'Service',
    tableName: 'service'
  });
  return Service;
};