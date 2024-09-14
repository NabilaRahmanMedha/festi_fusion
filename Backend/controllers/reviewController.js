import Event from "../models/Event.js";
import Review from "../models/Review.js";

export const createReview = async(req,res)=>{
    const eventId = req.params.eventId
    const newReview = new Review({...req.body})
    try {

        const savedReview = await newReview.save()
        
        await Event.findByIdAndUpdate(eventId,{
            $push: {reviews: savedReview._id}
        })
        res.status(200).json({
            success:true,
            message: "Review Submitted",
            data:savedReview
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "failed to Submit",
        });
    }
}