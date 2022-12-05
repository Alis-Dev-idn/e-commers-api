import {Router} from "express";

const ShippingData = Router();

ShippingData.get("/", (req, res) => {
    res.status(200).json({message: "ShippingData ok"});
});

export default ShippingData;