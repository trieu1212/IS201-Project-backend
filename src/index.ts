import  express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import connenction from './db/connection';
const app: express.Application = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
connenction()
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)