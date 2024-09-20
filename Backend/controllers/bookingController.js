
import Booking from "../models/Booking.js";

//create booking

export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({
            success:true,
            message:'Your Event is booked',
            data:savedBooking
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success:false,
            message:'Server Error',
        })
    }
};

//get single booking

export const getBooking = async(req,res)=>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success:true,
            message:'succcessful',
            data:book
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success:false,
            message:'not found',
        })
    }
};

//get all booking 

export const getAllBooking = async(req,res)=>{
    
    try {
        const books = await Booking.find()
        res.status(200).json({
            success:true,
            message:'succcessful',
            data:books
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:'Internal Server Error',
        })
    }
}

export const deleteBooking= async(req,res)=>{
    const id=req.params.id
    try {
        const booking =await Booking.findByIdAndDelete(id)
        if(booking){
            return res.json({
                success:true,
                message:'succcessful',

            })
        }
        else{
            return res.json({
                success:false,
                message:'false',

            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:'false',

        })
    }
}