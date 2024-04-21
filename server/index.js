import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postroute from './routes/posts.js'
import userRouter from './routes/users.js'
import dotenv from 'dotenv';


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postroute);
app.use('/user', userRouter);

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on : ${PORT}`)))
    .catch((error) => console.log(error.message))
