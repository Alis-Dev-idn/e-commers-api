import mongoose from "mongoose";

const id = mongoose.Schema.Types.ObjectId;

const CartsModel = mongoose.Schema({
    _id: id,
    list: Array({
        image: String,
        name_shop: String,
        city_show: String,
        note: String,
        price: Number,
        color: Number,
        new_note: String,
        destination: String,
        address_shop: String,
        count: Number
    })
}, {timestamps: true});

export default mongoose.model("cart", CartsModel);