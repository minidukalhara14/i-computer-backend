import express from "express";
import { changePassword, creatUser, getUserData, googleLogin, loginUser, updateUserData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register" , creatUser);
userRouter.post("/login" , loginUser);
userRouter.get("/me" , getUserData);
userRouter.put("/me" , updateUserData);
userRouter.put("/password" , changePassword);
userRouter.post("/google-login" , googleLogin);


export default userRouter;  