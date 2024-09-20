
import express from 'express';
import {createEvent,updateEvent,deleteEvent,getSingleEvent,getAllEvent,
    getEventBySearch,getFeaturedEvent,getEventCount} 
    from '../controllers/eventController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router()


//create new event
router.post("/", verifyAdmin, createEvent);

//update event
router.put("/:id", verifyAdmin, updateEvent);

//delete event
router.delete("/:id", verifyAdmin, deleteEvent);

//get single event
router.get("/:id", getSingleEvent);

//getAll Event
router.get("/", getAllEvent);

//get event by search
router.get("/search/getEventBySearch", getEventBySearch);

//get featured event
router.get("/search/getFeaturedEvent", getFeaturedEvent);

//get event count
router.get("/search/getEventCount", getEventCount);

export default router;