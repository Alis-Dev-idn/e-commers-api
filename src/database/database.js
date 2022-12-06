import mongoose from "mongoose";
import UserModel from "./models/user.model.js";
import UserDataModels from "./models/user.data.models.js";
import CartsModel from "./models/carts.model.js";
import ListProductsModel from "./models/list.products.model.js";

const ConnectDb = (host, port, user, password, db) => {
    const url = `mongodb://${user}:${password}@${host}:${port}/${db}`
    mongoose.connect(url, {}).then(data => {
        console.log("db is connected");
    }).catch(error => {
        console.log(error);
    })
}


export {
    ConnectDb,
    UserModel,
    UserDataModels,
    CartsModel,
    ListProductsModel
}