import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
// import { getReceiverSocketId } from "../socket/socket.js";
import { getReceiverSocketId, io } from "../socket/socket.js";



export const sendMessage=async(req,res)=>{
    try {
        // console.log(req.user)
        const {message}=req.body
        const {id:receiverId}=req.params
        const senderId=req.user._id
        // console.log(senderId)
        
        //idhu conversation model la irundhu create pannadhu
        let conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}           //idha nalla note pannu,epudi array type model ku data va ulla podrom nu
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]          //array kula data va podrom
            })
        }
        //idhu message model la irundhu create pannradhu
        const newMessage=new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //socket functionality

        
        // await conversation.save()
        // await newMessage.save()

        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()])

        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }



        res.status(201).json(newMessage)
        
        
    } catch (error) {
        console.log('error from sendMessage Controller',error.message)
        res.status(500).json({error:'Internal server Error'});
        
    }
}




export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;//oppsite irukuravan id
        const senderId=req.user._id//namma id from jwt

        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate('messages')

        if(!conversation) return res.status(200).json([])

        const messages=conversation.messages

        res.status(200).json(messages)

    } 
    catch (error) {
        console.log("error from getMessage Controller", error.message);
        res.status(500).json({ error: "Internal server Error" });
        
        
    }
}