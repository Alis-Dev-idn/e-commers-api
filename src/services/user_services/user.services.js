import {UserModel, UserDataModels} from "../../database/database.js";
import {UserData} from "../../mockup/first.data.js";

class UserServices {

    static async GetUser(by, data, hidden) {
        if(by === "id") {
            if(hidden) return UserModel.findOne({_id: data}, {password: 0, __v: 0});
            return UserModel.findOne({_id: data}, {__v: 0});
        }
        if(by === "username") {
            if(hidden) return UserModel.findOne({username: data}, {password: 0,__v: 0});
            return UserModel.findOne({username: data}, {__v: 0});
        }
        if(by === "email") {
            if(hidden) return UserModel.findOne({email: data}, {password: 0,__v: 0});
            return UserModel.findOne({email: data}, {__v: 0});
        }
        if(by === "all") {
            const count = await UserModel.find({}, {password: 0, __v: 0}).count();
            const data = await UserModel.find({}, {password: 0, __v: 0});
            return  {count, data};
        }
    }

    static async CreateUser(data) {
        const result = UserModel(data);
        await result.save();
        await this.CreateDataUser(data.email);
        return "ok";
    }

    static async CreateDataUser(email) {
        const getId = await this.GetUser("email", email, false);
        UserData._id = getId._id;
        const result = UserDataModels(UserData);
        await result.save();
        return "ok";
    }

    static async DeleteUser(id) {
        await UserModel.deleteOne({_id: id});
        await UserDataModels.deleteOne({_id: id});
        return "ok";
    }
}

export default UserServices;