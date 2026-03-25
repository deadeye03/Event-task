import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);

export default userRouter;
