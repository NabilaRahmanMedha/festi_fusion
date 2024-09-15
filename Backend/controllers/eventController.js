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
        console.log(err);
        res
        .status(500)
        .json({
            success:false, 
            message:"failed to create. try again"
        });
    }
};   

//update event
export const updateEvent = async (req , res) => {
    const id = req.params.id
    try{
        
        const updatedEvent = await Event.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200)
            .json({
                success:true, 
                message:"successfully updated",
                data: updatedEvent,
            });

    } catch(err){
        res.status(500)
            .json({
                success:false, 
                message:"failed to update",
            });
    }
};

//delete event
export const deleteEvent = async (req , res) => {
    const id = req.params.id
    try{
        await Event.findByIdAndDelete(id);

        res.status(200)
            .json({
                success:true, 
                message:"successfully deleted",
            });

    } catch(err){
        res.status(500)
            .json({
                success:false, 
                message:"failed to delete",
            });
    }
};

//getSingle event
export const getSingleEvent = async (req , res) => {
    const id = req.params.id
    try{
        
        const event = await Event.findById(id)
        .populate("reviews");

        res.status(200)
            .json({
                success:true, 
                message:"successful",
                data: event
            });

    } catch(err){
        res.status(404)
            .json({
                success:false, 
                message:"Not Found",
            });
    }
};

//getAll event
export const getAllEvent = async (req , res) => {

    const page = parseInt(req.query.page);

    try{
        const events = await Event.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);

        res.status(200).json({
            success:true,
            count: events.length,
            message:"successful",
            data: events
        })
    } catch(err){
        res.status(404)
            .json({
                success:false, 
                message:"Not Found",
            });
    }
};

//get event by search
export const getEventBySearch = async(req,res)=>{

    const city = new RegExp(req.query.city,'i')
    const budget = parseInt(req.query.budget)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{

        const events = await Event
        .find({city,
            budget:{$gte:budget},
            maxGroupSize:{$gte:maxGroupSize}})
            .populate("reviews");
        res.status(200).json({
            success:true,
            message:"successful",
            data: events
        })
    }catch(err){
        res.status(404)
            .json({
                success:false, 
                message:"Not Found",
            });
    }

};

//get featured event
export const getFeaturedEvent = async (req , res) => {

    try{
        const events = await Event.find({featured:true})
        .populate("reviews")
        .limit(8);

        res.status(200).json({
            success:true,
            message:"successful",
            data: events
        })
    } catch(err){
        res.status(404)
            .json({
                success:false, 
                message:"Not Found",
            });
    }
};

//get event counts
export const getEventCount = async(req,res)=>{

    try {
        const eventCount = await Event.estimatedDocumentCount()

        res.status(200).json({success:true,data:eventCount})
    } catch (error) {
        res.status(500).json({success:false,message:'failed to fetch'});
    }
};