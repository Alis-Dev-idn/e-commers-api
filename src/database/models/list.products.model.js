import mongoose from "mongoose";

const ListProductsModel = mongoose.Schema({
    name: String,
    detail: String,
    image: String,
    price: Number,
    stock: Number,
    category: String,
    promotion: {
        _id: false,
        status: Boolean,
        value: Number
    },

}, {timestamps: true});

export default mongoose.model("list_product", ListProductsModel);