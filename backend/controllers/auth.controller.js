import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";



//login controller
export const loginUser = async(req, res) => {
  try {
    const {username,password}=req.body;
    const user=await User.findOne({username})
    const isPasswordCorrect=await bcrypt.compare(password,user?.password || '')

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error:"Invalid username or password"});
    }

    generateTokenAndSetCookie(user._id,res)

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });

    
  } 
  catch (error) {
    console.log("Error in signin controller", error.message);
    res.status(500).json({ error: "Internal server error" });
    
  }


  
};



//logout controller
export const logoutUser =async (req, res) => {
  try {
    res.cookie('jwt','',{maxAge:0});
    res.status(200).json({message:'Logged out Sucessfully'})
    
  } 
  catch (error) {
    
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
    
  }
};




//signup controller
export const signUp = async(req, res) => {
  try {
    const{fullname,username,password,confirmPassword,gender}= req.body

    if(password!==confirmPassword){
      return res.status(400).json({"error":"Passwords do not match"})
    }

    const user=await User.findOne({username})

    if(user){
      res.status(400).json({error:"username already exists"})
    }

    //hash password here
     const hashedPassword=await bcrypt.hash(password,12);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser=new User({
      fullname,
      username,
      password:hashedPassword,
      gender,
      profilePic:gender==='male' ? boyProfilePic : girlProfilePic  
    })
    
    if(newUser){
      //generate JWT token
      await newUser.save();
      generateTokenAndSetCookie(newUser._id,res)
      res.status(201).json({
          _id: newUser._id,
          fullname: newUser.fullname,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });

    }
    else{
      res.status(400).json({error:'Invalid user data'})
    }
  } 

  catch (error) {
    console.log('Error in signup controller',error.message)
    res.status(500).json({error:'Internal server error'})
  }
};

