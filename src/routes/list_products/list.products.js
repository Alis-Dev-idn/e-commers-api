import {Router} from "express";

const ListProducts = Router();

ListProducts.get("/", (req, res) => {
    res.status(200).json({message: "List Product ok"});
});

export default ListProducts;