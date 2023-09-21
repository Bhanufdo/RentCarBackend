import Car from "../models/Cars.js"

// add new car
export const addCar = async (req, res) => {
    const newCar = new Car(req.body);

    try {
        const savedCar = await newCar.save();

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedCar,
        });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        });
    }
};

// update car
export const updateCar = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedCar,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again"
        });
    }
};

// delete car
export const deleteCar = async (req, res) => {
    const id = req.params.id;

    try {
        await Car.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        });
    }
};

// getSingle car
export const getSingleCar = async (req, res) => {
    const id = req.params.id;

    try {
        const car = await Car.findById(id);

        res.status(200).json({
            success: true,
            message: "Success",
            data: car,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found"
        });
    }
};

// getAll car
export const getAllCar = async (req, res) => {

    // paginating
    // const page = parseInt(req.query.page);
    const { minP, maxP, minPas, sortBy, sortOrder, ...others } = req.query;

    try {
        const queryOptions = {
            ...others,
            price: { $gte: minP | 0, $lte: maxP || 999999999},
            noOfDoors: { $gte: minPas | 0 },
        };

        const cars = await Car.find(queryOptions).sort({
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        });

        res.status(200).json({
            success: true,
            count: cars.length,
            message: "Successful",
            data: cars,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found"
        });
    }
};

// get popular cars
export const getPopularCars = async (req, res) => {

    try {
        const popularCars = await Car.find().sort({ viewCount: -1 }).limit(5);

        res.status(200).json({
            success: true,
            message: "Successfully fetched top 5 popular cars",
            data: popularCars,
        });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching popular cars"
        });
    }
};

// get car by search
export const getCarBySearch = async (req, res) => {

    const brand = new RegExp(req.query.brand, "i");
    const vehicleName = new RegExp(req.query.model, "i");
    const sizeClass = new RegExp(req.query.size, "i");
    const maxPassengers = parseInt(req.query.maxPassengers);

    try {
        const cars = await Car.find({
            brand,
            vehicleName,
            sizeClass,
            maxPassengers: { $gte: maxPassengers},
        });

        res.status(200).json({
            success: true,
            count: cars.length,
            message: "Successful",
            data: cars,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found"
        });
    }
};

// get tour counts
export const getCarCount = async (req, res) => {
    try{
        const carCount = await Car.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            data: carCount
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to fetch"
        });
    }
};