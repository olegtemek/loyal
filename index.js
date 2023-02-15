import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors'
import express from 'express';


const app = express()
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


import authRoutes from './src/routes/index.js'

app.use('/api', authRoutes)



app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port: ${process.env.APP_PORT}`);
})
