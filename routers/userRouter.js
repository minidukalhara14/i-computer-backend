import express from "express";
import { changePassword, creatUser, getUserData, loginUser, updateUserData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/" , creatUser);
userRouter.post("/login" , loginUser);
userRouter.get("/me" , getUserData);
userRouter.put("/" , updateUserData);
userRouter.put("/password" , changePassword);

export default userRouter;