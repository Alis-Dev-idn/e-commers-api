import express from "express";
import Users from "./users/users.js";
import StoreData from "./store_data/store.data.js";
import ShippingData from "./shipping_data/shipping.data.js";
import ReviewData from "./review_data/review.data.js";
import ListProducts from "./list_products/list.products.js";
import Carts from "./carts/carts.js";

const Routes = express();

Routes.use("/user", Users);
Routes.use("/shipping", ShippingData);
Routes.use("/store", StoreData);
Routes.use("review", ReviewData);
Routes.use("/carts", Carts);
Routes.use("/list-product", ListProducts);

Routes.use((req, res, next) => {
    res.status(404).json({status: "server is running", error: "endpoint is wrong"});
});

export default Routes;