import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/event.controller";
import { getEventBookings } from "../controllers/booking.controller";

const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/", createEvent);
eventRouter.delete("/:id", deleteEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.get("/:bookingCode/attendance", getEventBookings);

export default eventRouter;
