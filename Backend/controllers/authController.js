
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoCryptKMSRequestNetworkTimeoutError } from "mongodb";
//user registration
export const register = async (req,res) => {
    
    try {

        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        
        const newUser = new User({
            username: req.body.userName,
            email:req.body.email,
            password:hash,
            //password:req.body.password,
            photo:req.body.photo
        });

        await newUser.save()

        res.status(200).json({
            success:true,
            message:'Successfully Created'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Failed to create.Try again'
        });
    }
};

//user login
export const login = async (req,res) => {
    const email = req.body.email
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message: 'User not Found'
            })
        }

        const checkCorrectPassword = await bcrypt.compare(
            req.body.password,user.password)

        if(!checkCorrectPassword){
            return res.status(401).json({
                success:false,
                message: 'Incorrectr email or Password'
            })
        }

        const { password, role, ...rest} = user._doc

        const token = jwt.sign(
            {id:user._id,role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "15d"}
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        })
        .status(200)
        .json({     
            token,
            data: {...rest},
            role,
        });
        
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message: "Failed to Login"
        });
    }
};