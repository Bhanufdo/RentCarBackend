import express from "express";
import { addUser, deleteUser, getAllUser, getSingleUser, updateUser } from "./../controllers/userController.js";

const router = express.Router();

import { verifyAdmin, verifyUser} from "../utils/veifyToken.js"

// create new user
router.post('/', verifyUser, addUser);

// update user
router.put('/:id', verifyUser, updateUser);

// delete user
router.delete('/:id', deleteUser);

// getSingle user
router.get('/:id', verifyUser, getSingleUser);

// getAll user
router.get('/', getAllUser);

export default router;