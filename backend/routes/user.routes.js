import express from "express";
import securityRoute from "../middleware/securityRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/',securityRoute,getUsersForSidebar)



export default router