import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.models.js";
dotenv.config();

const securityRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res
        .status(500)
        .json({ error: "Unauthorized user-No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized-Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    // console.log(user)

    req.user=user


    next();
  } 
  catch (error) {
    console.log("error from securityRoute", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export default securityRoute