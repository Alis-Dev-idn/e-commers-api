import mongoose from "mongoose";

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