import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user_route.js';
import authRoutes from './routes/auth_route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");            
    })
    .catch((err) => {
        console.log(err)
        console.log("Unable to connect to database")
    })

// const __dirname = path.resolve()


const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

app.use('/backend/user_route', userRoutes)
app.use('/backend/auth_route', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})