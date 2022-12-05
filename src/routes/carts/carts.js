import {Router} from "express";

const Carts = Router();

Carts.get("/", (req, res) => {
    res.status(200).json({message: "Carts ok"});
});

export default Carts;