
import express from 'express';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import cookieParser from 'cookie-parser';

import createAdmin from './utils/createAdmin.js';

import eventRoute from './routes/events.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import adminRoute from './routes/admin.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
};


//database connection

mongoose.set("strictQuery", false);
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
           useNewUrlParser: true,
           useUnifiedTopology:true
        })

        console.log("MongoDB database connected");
    }catch(err){
        console.log("MongoDB database connection failed");
    }
};

connect();
createAdmin();

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/admin", adminRoute);

app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.listen(port, ()=>{

    console.log("server listening on port", port);
});
