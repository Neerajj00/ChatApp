import User from './../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from '../lib/stream.js';

export async function signup(req, res) {
  const { fullName, email, password } = req.body;
  try {
    // not empty
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // password should be atleast 6 digit
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 digit character" });
    }
    // check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check for existing user
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"email already registered, please use diffrent one"});
    }

    // create a random avatar
    const index = Math.floor(Math.random() * 100) + 1 ;
    const randomAvatar = `https://avatar.iran.liara.run/public/${index}`;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = await User.create({
        fullName,
        email,
        password : hashedPassword,
        profilePic : randomAvatar,
    })

    try {
        await upsertStreamUser({
            id:newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic || ""
        });
        console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
        console.log("error creating stream user", error);
    }
    
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt",token , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })

    res.status(201).json({success:true, user:newUser})
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({message:"internal server errro"});
  }
}

export async function login(req, res) {
  try {
    const {email, password} = req.body;
    if(!email || ! password) return res.status(400).json({message: "All fields are required"});
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid email of password"});
    }
    
    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid email of password"});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt",token , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })

    res.status(200).json({status:true, message:"login Successfull" , user});
    
} catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({status:false, message:"Internal server error"});
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({success:true, message:"logout successfull"});
}
