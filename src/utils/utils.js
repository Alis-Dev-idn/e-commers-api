import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();

export const CreateResponse = (res, status, data) => {
    return res.status(status).json(data);
}

export const DbValidate = (id) => {
    const _id = mongoose.Types.ObjectId;
    if(_id.isValid(id)){
        return (String)(new Object(id)) === id;
    }
    return false
}

export const GenerateToken = async (id) => {
    return await jwt.sign({
        exp: Math.floor(new Date() /1000) + (1440*60),
        data: {id: id}
    }, process.env.SECREAT_KEY_1);
}