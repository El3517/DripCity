import express from "express";
import {placeOrder, placeOrderFlutterwave,verifyFlutterwavePayment, placeOrderPaypal, allOrders, userOrders, updateStatus, verifyPaypalPayment} from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/flutterwave', authUser, placeOrderFlutterwave)
orderRouter.post('/paypal', authUser, placeOrderPaypal)
orderRouter.post('/paypal-verify', authUser, verifyPaypalPayment)
orderRouter.post('/payment-redirect', authUser, verifyFlutterwavePayment)

//user Features
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter