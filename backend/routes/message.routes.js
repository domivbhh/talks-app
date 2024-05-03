import express from 'express'
import { sendMessage,getMessages } from '../controllers/message.contoller.js'
import securityRoute from '../middleware/securityRoute.js'


const router=express.Router()

router.post('/send/:id',securityRoute,sendMessage)
router.get('/:id',securityRoute,getMessages)


export default router