
import express, { Router } from 'express';
//import {createEvent} from '../controllers/eventsController.js';
import { createEvent,updateEvent,deleteEvent,getSingleEvent,getAllEvent,getEventBySearch,
    getFeaturedEvent,getEventCount} from '../controllers/eventsController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const routes = express.Router()


//create new event
routes.post('/', verifyAdmin,createEvent);

//update event
routes.put("/:id", verifyAdmin,updateEvent);

//delete event
routes.delete("/:id",verifyAdmin,deleteEvent );

//get single event
routes.get("/:id", getSingleEvent);

//getAll Event
routes.get("/", getAllEvent);

//get event by search
routes.get("/search/getEventBySearch", getEventBySearch);

//get featured event
routes.get("/search/getFeaturedEvent", getFeaturedEvent);

//get event count
routes.get("/search/getEventCount", getEventCount);

export default routes;