import { Router } from "express";
import {
  createBooking,
  deleteBooking,
} from "../controllers/booking.controller";

const bookingRouter = Router();

bookingRouter.post("/", createBooking);
bookingRouter.delete("/:bookingId", deleteBooking);

export default bookingRouter;
