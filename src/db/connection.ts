import { Sequelize } from "sequelize";


const dbName = process.env.DB_NAME || 'thuetro';
const dbUsername = process.env.DB_USERNAME || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
export const sequelize = new Sequelize(dbName,dbUsername,dbPassword,{
    host:dbHost,
    dialect:'mysql'
})
export const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

