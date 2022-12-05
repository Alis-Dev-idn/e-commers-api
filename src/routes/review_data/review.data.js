import {Router} from "express";

const ReviewData = Router();

ReviewData.get("/", (req, res) => {
    res.status(200).json({message: "ReviewData ok"});
});

export default ReviewData;