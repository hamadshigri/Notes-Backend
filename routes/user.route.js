import express from "express";
import {register, login} from "../controllers/user.controller.js";
import {verifyAuthentication} from "../middlewares/auth.middleware.js";


const router = express.Router();


router.post("/register", register);
router.post("/login", verifyAuthentication, login)

export default router;