import  express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route'
import serviceRoute from './routes/service.route'
import orderRoute from './routes/order.route'
import userRoute from './routes/user.route'
import {connection} from './db/connection';
const app: express.Application = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

connection()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
app.use('/api/auth',authRoute)
app.use('/api/service',serviceRoute)
app.use('/api/order',orderRoute)
app.use('/api/user',userRoute)