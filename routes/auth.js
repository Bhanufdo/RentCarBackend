import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// user login
router.post('/register', register);

// user register
router.post('/login', login);

export default router