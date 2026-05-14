import express from "express";
import { creatUser, getUserData, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/" , creatUser);
userRouter.post("/login" , loginUser);
userRouter.get("/me" , getUserData);

export default userRouter;