import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getEventBookings,
  getUserBookings,
} from "../controllers/booking.controller";

const bookingRouter = Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/user/:userId/bookings", getUserBookings);
bookingRouter.get("/event/:bookingCode/attendance", getEventBookings);
bookingRouter.delete("/:bookingId", deleteBooking);

export default bookingRouter;
