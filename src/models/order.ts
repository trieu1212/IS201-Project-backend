'use strict';
import { Model } from 'sequelize';
type OrderAttributes = {
  status: string,
  dateStart: Date,
  dateEnd: Date,
  totalPrice:number,
  userId:number,
  serviceId:number
};
module.exports = (sequelize:any, DataTypes:any) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    status!: string
    dateStart!: Date
    dateEnd!: Date
    totalPrice!:number
    userId!:number
    serviceId!:number
    static associate(models:any) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Service)
    }
  }
  Order.init({
    status: DataTypes.STRING,
    dateStart: DataTypes.DATE,
    dateEnd: DataTypes.DATE,
    totalPrice:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    serviceId:DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Order',
    tableName: 'order'
  });
  return Order;
};