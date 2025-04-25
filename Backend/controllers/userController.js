import userModel from "../models/userModel.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User doesn't exist, try creating a new account nitty"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid cred"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Route for signUp
const registerUser = async (req, res)=>{
   
    try {
        const {name, email, password} = req.body;
        //User already exists check
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false, message:"User already exist, you fraud"})
        }

        //Validate email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a valid email, I beg you"})
        }
        if(password.length < 8){
            return res.json({success:false, message:"Password is too weak scum"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


//Route for admin login
const adminLogin = async (req, res)=>{
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"You are not the admin, are you?, try again if you are"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}