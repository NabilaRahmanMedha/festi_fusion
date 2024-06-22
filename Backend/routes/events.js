
import express from 'express';
import { createEvent } from '../controllers/eventsController.js';

const routes = express.Router()


//create new event
routes.post('/', createEvent)


export default routes;