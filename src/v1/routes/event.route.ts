import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/", createEvent);
eventRouter.delete("/:id", deleteEvent);
eventRouter.put("/:id", updateEvent);

export default eventRouter;
