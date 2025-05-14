import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
import nodemailer from 'nodemailer'


//global variables
const CURRENCY = 'NGN'
const deliveryCharge = 1000


//gateway initialize
// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY)

//Placing orders using COD method

const placeOrder = async (req, res)=>{
    try {
        
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success:true, message:"Order Placed, get ready to drip"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//placing orders using flutterwave
const placeOrderFlutterwave = async (req, res)=>{
    try {
        
        const {userId, items, amount, address} = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Flutterwave",
            payment: false,
            status: "Pending",
            date: Date.now(),
        };


        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const paymentData = {
            tx_ref: `tx-${Date.now()}`,
            amount,
            currency: CURRENCY,
            redirect_url: `${process.env.BASE_CLIENT_URL}/payment-redirect?orderId=${newOrder._id}`,
            customer:{
                email: address?.email,
                name: `${address.firstName} ${address.lastName}`,
            },
            meta:{
                orderId: newOrder._id,
            },
            customization:{
                title: "Dripcity Payment",
                description: "Payment for items in your cart",
            },
        }

        const response = await axios.post('https://api.flutterwave.com/v3/payments', paymentData, {
            headers:{
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                'Content-Type' : 'application/json'
            },
        });

        return res.status(200).json({
            success: true,
            message: "Redirecting to flutterwave",
            authorization_url: response.data.data.link
        });

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({success: false, message: "Order creation failed", error: error.message});
    }
};
//Verifying Flutterwave Payment
const verifyFlutterwavePayment = async (req, res) =>{
    try {
        
        const { transaction_id, status, orderId, userId } = req.body;
        
       

        if(status === "cancelled"){
            await orderModel.findByIdAndUpdate(orderId, {status: "cancelled"});
            return res.json({success: false})
        }

        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
            headers:{
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            }
        });

        const paymentStatus = response.data.data.status;

        if(paymentStatus === "successful"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true, status: "Paid"});
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            await sendConfirmationEmail(response.data.data.customer.email);
            return res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            return res.json({success: false})
        }


    } catch (error) {
        console.error("Verification error: ", error?.response?.data || error.message);
        res.json({success:false})
    }
}

//Confirmation email
const sendConfirmationEmail = async (toEmail) =>{
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Payment Successful- Dripcity",
        text: "Thanks for shopping with us"
    })
}


//Placing orders using  Paypay
const placeOrderPaypal = async (req, res)=>{
    try {
        //Save the order
          const {userId, items, amount, address} = req.body;
             const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Paypal",
            payment: false,
            status: "Pending",
            date: Date.now(),
        };


        const newOrder = new orderModel(orderData);
        await newOrder.save();

        //Get Paypal Access token
        const auth = await axios({
            method: 'post',
            url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            headers:{
                "Content-Type" : 'application/x-www-form-urlencoded'
            },
            auth:{
                username: process.env.PAYPAL_CLIENT_ID ,
                password: process.env.PAYPAL_CLIENT_SECRET,
            },
            data: 'grant_type=client_credentials',
        });

        const accessToken = auth.data.access_token;

        //Create Paypal Order
        const createOrder = await axios.post(
            'https://api-m.sandbox.paypal.com/v2/checkout/orders',
            {
                intent: 'CAPTURE',
                purchase_units:[
                    {
                        amount:{
                            currency_code: 'USD',
                            value:amount,
                        },
                        custom_id: newOrder._id.toString(),
                    },
                ],
                application_context:{
                    return_url: `${process.env.BASE_CLIENT_URL}/payment-paypal-redirect?orderId=${newOrder._id}`,
                    cancel_url: `${process.env.BASE_CLIENT_URL}/payment-cancelled`,
                },
            },
            {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const approvalUrl = createOrder.data.links.find(link => link.rel === 'approve')?.href;
        res.json({success: true, approvalUrl, orderId: newOrder._id});

    } catch (error) {
        console.log('Paypal order creation error:', error?.response?.data || error.message)
        res.status(500).json({success: false, message: "Paypal payment failed"})
    }
}
const verifyPaypalPayment = async (req, res) =>{
    try {
        
        const {orderId, paymentId, payerId, userId} = req.body;

        //Exchange the paymentId and payerId for payment execution
        const basicAuth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}: ${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');

        const executeRes = await axios.post(
            `https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
            {
                payer_id: payerId
            },
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/json"
                }
            }
        );
        if (executeRes.data.state === "approved") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true, status: "Paid"});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});

            await sendConfirmationEmail(executeRes.data.payer.payer_info.email);

            return res.json({success: true});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            return res.json({success: false, message: "Payment not approved"});
        }

    } catch (error) {
        console.log("Paypal verification error: ", error?.response?.data || error.message);
        res.json({success:false})
    }
};

//All orders data for admin panel
const allOrders = async (req, res)=>{
    
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//User Order data for frontend
const userOrders = async (req, res)=>{
    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//update order status from admin panel
const updateStatus = async (req, res)=>{
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Status Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {placeOrder, placeOrderFlutterwave, verifyFlutterwavePayment, placeOrderPaypal, verifyPaypalPayment, allOrders, userOrders, updateStatus}