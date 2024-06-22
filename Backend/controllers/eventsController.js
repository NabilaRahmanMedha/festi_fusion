import Event from "../models/Event.js";


//create new event
export const createEvent = async(req, res)=>{
    const newEvent = new Event(req.body)

    try{
        const savedEvent = await newEvent.save();
        res
            .status(200)
            .json({
                success:true, 
                message:"successfully created",
                data:savedEvent,
            });
    } catch(err){
        res
            .status(500)
            .json({success:false, message:"failed to create. try again"})
    }
}