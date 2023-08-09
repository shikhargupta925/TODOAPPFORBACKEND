import express  from "express";
import {  logout, getMyProfile,login,register } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.get('/logout', logout);
router.post('/new', register);
router.post('/login',login)       
router.get('/me', isAuthenticated,getMyProfile);




export default router;