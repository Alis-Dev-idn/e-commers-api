import {Router} from "express";

const StoreData = Router();

StoreData.get("/", (req, res) => {
    res.status(200).json({message: "StoreData ok"});
});

export default StoreData;