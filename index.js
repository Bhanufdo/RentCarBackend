import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import carRoute from './routes/cars.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config()
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
};

// database connection
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log("MongoDB database connection established");
    } catch (err) {
        console.log("MongoDB database connection failed");
        throw err;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!");
});

// for testing
app.get("/", (req,res) => {
    res.send("api is working");
});

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/cars', carRoute);
app.use('/api/users', userRoute);
app.use('/api/review', reviewRoute);
app.use('/api/booking', bookingRoute);


app.listen(port, ()=> {
    connect();
    console.log('server listening on port', port);
})