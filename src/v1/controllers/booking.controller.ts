import { Request, Response } from "express";
import { db } from "@/lib/prisma";
import { handlePrismaError, handleZodError } from "@/utils/error";
import { errorResponse, parseId, successResponse } from "@/utils/helper";
import { createBookingValidation } from "@/utils/validation";

const createBooking = async (req: Request, res: Response) => {
  const validationResult = createBookingValidation.safeParse(req.body);
  if (!validationResult.success) {
    const { status, message } = handleZodError(validationResult.error);
    res.status(status).json(errorResponse(message));
    return;
  }
  try {
    await db.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: validationResult.data.eventId },
      });

      if (!event) throw new Error("Event not found");

      if (event.remaining_tickets < validationResult.data.numberOfTickets) {
        throw new Error("Not enough tickets");
      }

      const booking = await tx.booking.create({
        data: validationResult.data,
      });

      await tx.event.update({
        where: { id: validationResult.data.eventId },
        data: {
          remaining_tickets: {
            decrement: validationResult.data.numberOfTickets,
          },
        },
      });
      res.status(201).json(successResponse(booking));
    });
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const getUserBookings = async (req: Request, res: Response) => {
  const userId = parseId(req.params.userId);
  if (userId === null) {
    res.status(400).json(errorResponse("Invalid user"));
    return;
  }
  try {
    const bookings = await db.booking.findMany({
      where: {
        userId,
      },
      include: {
        event: true,
      },
    });
    res.status(200).json(successResponse(bookings));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const getEventBookings = async (req: Request, res: Response) => {
  const bookingCode = req.params.bookingCode as string;
  if (!bookingCode) {
    res.status(400).json(errorResponse("Invalid booking code"));
    return;
  }
  try {
    const bookings = await db.booking.findMany({
      where: {
        bookingCode,
      },
      include: {
        event: true,
        user: true,
      },
    });
    if (bookings.length === 0) {
      res.status(404).json(errorResponse("No bookings found for this event"));
      return;
    }
    res.status(200).json(
      successResponse({
        message: `Event has ${bookings.length} bookings`,
        ...bookings,
      }),
    );
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = parseId(req.params.bookingId);
  if (bookingId === null) {
    res.status(400).json(errorResponse("Invalid booking"));
    return;
  }
  try {
    const booking = await db.booking.delete({
      where: {
        id: bookingId,
      },
    });
    res.status(200).json(successResponse(booking));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

export { createBooking, getUserBookings, getEventBookings, deleteBooking };
