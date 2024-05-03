import mongoose from "mongoose";

const connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MONGO_DB')
    } 
    catch (error) {
        console.log("Error connection to MONGO_DB",error.message)
    }
}

export default connectToDB