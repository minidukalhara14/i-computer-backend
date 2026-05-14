import express from "express";
import createOrder, { getOrders, updateOrderStatusAndNotes } from "../controllers/OrderController.js";



const orderRouter = express.Router();

orderRouter.post("/" , createOrder)
orderRouter.get("/:pageSize/:pageNumber" , getOrders)
orderRouter.put("/:orderId" , updateOrderStatusAndNotes) 


export default orderRouter;