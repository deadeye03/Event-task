import { Request, Response } from "express";
import { db } from "@/lib/prisma";
import { handlePrismaError, handleZodError } from "@/utils/error";
import { errorResponse, successResponse } from "@/utils/helper";
import { createEventValidation } from "@/utils/validation";

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await db.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
    });
    res.status(200).json(successResponse(events));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const createEvent = async (req: Request, res: Response) => {
  const validationResult = createEventValidation.safeParse(req.body);
  if (!validationResult.success) {
    const { status, message } = handleZodError(validationResult.error);
    res.status(status).json(errorResponse(message));
    return;
  }
  try {
    const event = await db.event.create({
      data: {
        title: validationResult.data.title,
        description: validationResult.data.description,
        date: new Date(validationResult.data.date),
        total_capacity: validationResult.data.totalCapacity,
        remaining_tickets: validationResult.data.remainingTickets,
      },
    });
    res.status(201).json(successResponse(event));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idValue = Array.isArray(id) ? id[0] : id;
  const parsedId = Number.parseInt(idValue, 10);
  if (Number.isNaN(parsedId)) {
    res.status(400).json(errorResponse("Invalid event ID"));
    return;
  }
  try {
    const event = await db.event.delete({
      where: {
        id: parsedId,
      },
    });
    res.status(200).json(successResponse(event));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idValue = Array.isArray(id) ? id[0] : id;
  const parsedId = Number.parseInt(idValue, 10);
  try {
    if (Number.isNaN(parsedId)) {
      res.status(400).json(errorResponse("Invalid event ID"));
      return;
    }
    const event = await db.event.update({
      where: {
        id: parsedId,
      },
      data: req.body,
    });
    res.status(200).json(successResponse(event));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

export { getAllEvents, createEvent, deleteEvent, updateEvent };
