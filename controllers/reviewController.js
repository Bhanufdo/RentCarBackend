import Car from "../models/Cars.js";
import Review from "../models/Review.js";

export const createReview = async (req, res)=>{
    const car_id = req.params.car_Id;
    const newReview = new Review({ ...req.body })

    try{
        const savedReview = await newReview.save();

        const car = await Car.findById(car_id);
        if (!car) {
            console.log('Car not found with ID:', car_id);
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        car.reviews.push(savedReview._id);
        await car.save();

        res.status(200).json({
            success: true,
            message: "Review Submitted",
            data: savedReview,
        });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({
            success: false,
            message: "An error occurred",
        });
    }
}