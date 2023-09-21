import express from "express";
import { addCar, deleteCar, getAllCar, getCarBySearch, getCarCount, getSingleCar, updateCar, getPopularCars } from "./../controllers/carController.js";
import { verifyAdmin } from '../utils/veifyToken.js';

const router = express.Router();

// create new car
router.post('/', verifyAdmin, addCar);

// update car
router.put('/:id', verifyAdmin, updateCar);

// delete car
router.delete('/:id', verifyAdmin, deleteCar);

// getSingle car
router.get('/:id', getSingleCar);

// getAll car
router.get('/', getAllCar);

// get popular cars
router.get('/search/getPopularCars', getPopularCars);

// get car by search
router.get('/search/getCarBySearch', getCarBySearch);

// get car count
router.get('/search/getCarCount', getCarCount);


export default router;