import { Request, Response } from "express";
import { db } from "@/lib/prisma";
import { handlePrismaError, handleZodError } from "@/utils/error";
import { errorResponse, parseId, successResponse } from "@/utils/helper";
import { createUserValidation, updateUserValidation } from "@/utils/validation";

const createUser = async (req: Request, res: Response) => {
  const validationResult = createUserValidation.safeParse(req.body);
  if (!validationResult.success) {
    const { status, message } = handleZodError(validationResult.error);
    res.status(status).json(errorResponse(message));
    return;
  }
  try {
    const user = await db.user.create({
      data: {
        name: validationResult.data.name,
        email: validationResult.data.email,
      },
    });
    res.status(201).json(successResponse(user));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany();
    res.status(200).json(successResponse(users));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idValue = Array.isArray(id) ? id[0] : id;
  const parsedId = Number.parseInt(idValue, 10);
  if (Number.isNaN(parsedId)) {
    res.status(400).json(errorResponse("Invalid user ID"));
    return;
  }
  try {
    const user = await db.user.delete({
      where: {
        id: parsedId,
      },
    });
    res.status(200).json(successResponse(user));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idValue = parseId(id);
  if (idValue === null) {
    res.status(400).json(errorResponse("Invalid user ID"));
    return;
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id: idValue,
      },
    });
    res.status(200).json(successResponse(user));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idValue = parseId(id);
  if (idValue === null) {
    res.status(400).json(errorResponse("Invalid user ID"));
    return;
  }
  const validationResult = updateUserValidation.safeParse(req.body);
  if (!validationResult.success) {
    const { status, message } = handleZodError(validationResult.error);
    res.status(status).json(errorResponse(message));
    return;
  }
  try {
    const user = await db.user.update({
      where: {
        id: idValue,
      },
      data: {
        name: validationResult.data.name,
        email: validationResult.data.email,
      },
    });
    res.status(200).json(successResponse(user));
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json(errorResponse(message));
  }
};

export { createUser, getAllUsers, deleteUser, getUserById, updateUser };
