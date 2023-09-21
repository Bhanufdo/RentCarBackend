import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/veifyToken.js';

const router =  express.Router();

router.post('/:car_Id', verifyUser, createReview);

export default router