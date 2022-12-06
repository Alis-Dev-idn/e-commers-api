import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    no_hp: Number,
    date_brith: Number,
    gender: String,
    role: {type: String, default: "user"},
    code: String,
    active: {type: Boolean, default: false}
}, {timestamps: true});

export default mongoose.model("user", UserModel);