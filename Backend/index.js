
import express from 'express';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import cookieParser from 'cookie-parser';

import eventRoute from './routes/events.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;


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
        console.log("MongoDB database connection failed")
    }
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
// middleware
app.use(cors(
    {
        origin: ["https://festi-fusion.vercel.app"],
        method: ["POST","GET"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

mongoose.connect('mongodb+srv://rahmannabilamedha:Abc123456@cluster0.u7e5wha.mongodb.net/events_booking?');


app.listen(port, ()=>{
    connect();
    console.log("server listening on port", port);
});
