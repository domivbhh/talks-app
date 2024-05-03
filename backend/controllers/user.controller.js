import User from "../models/user.models.js";

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInuserId=req.user._id

        const filteredUsers=await User.find({_id:{$ne:loggedInuserId}}).select('-password')

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        
        console.log("error from getuserfor sidebar Controller", error.message);
        res.status(500).json({ error: "Internal server Error" });
        
    }
}