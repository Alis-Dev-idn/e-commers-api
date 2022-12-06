import mongoose from "mongoose";

const id = mongoose.Schema.Types.ObjectId;

const UserDataModels = mongoose.Schema({
    _id: id,
    name: String,
    picture: String,
    balance: Number,
    bank_account: Array({
        name_bank: String,
        no_account: Number
    }),
    address: Array({
        receiver_name: String,
        no_hp: Number,
        label: String,
        city: String,
        full_address: String,
        note: String,
        maps: {
            lat: Number,
            long: Number
        }
    })
}, {timestamps: true});


export default mongoose.model("user_data", UserDataModels);