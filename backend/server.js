import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user_route.js';
import authRoutes from './routes/auth_route.js';

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


const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

app.use('/backend/user_route', userRoutes)
app.use('/backend/auth_route', authRoutes)