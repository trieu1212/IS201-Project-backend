import { Sequelize } from "sequelize";
import { userModel } from "../models/user.model";

const dbName = process.env.DB_NAME || 'thuetro';
const dbUsername = process.env.DB_USERNAME || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const sequelize = new Sequelize(dbName,dbUsername,dbPassword,{
    host:dbHost,
    dialect:'mysql'
})

const connenction = async()=>{
    sequelize.authenticate().then(async()=>{
        console.log('Connection has been established successfully.')
        try {
            await userModel.sync()
        } catch (error) {
            console.error('Unable to sync the database:',error)
        }
    }).catch((err)=>{
        console.error('Unable to connect to the database:',err)
    })
}
export default connenction;
export {sequelize};