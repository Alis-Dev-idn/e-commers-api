import {UserModel, UserDataModels} from "../../database/database.js";
import {UserData} from "../../mockup/first.data.js";
import {HastServices} from "../services.js";
import {GenerateToken} from "../../utils/utils.js";

class UserServices {

    static async UserLogin(username, password) {
        const dataUser = await this.GetUser("username", username);
        if(!dataUser) throw({status: 400, message: "Username not found"});
        if(! await HastServices.ValidatePassword(password, dataUser.password)) throw ({status: 400, message: "Password wrong"});
        if(!dataUser.active) throw({status: 400, message: "Your account not active"});
        return {
            id: dataUser._id,
            username: dataUser.username,
            email: dataUser.email,
            role: dataUser.role,
            token: await GenerateToken(dataUser._id)
        }
    }

    static async UserUpdate(id, data) {
        const cekUser = await this.GetUser("id", id, false);
        if(!data) throw({status: 400, message: "No update data"});
        if(data.username) cekUser.username = data.username;
        if(data.email) cekUser.email = data.email;
        if(data.no_hp) cekUser.no_hp = data.no_hp;
        if(data.date_brith) cekUser.date_brith = data.date_brith;
        if(data.gender) cekUser.gender = data.gender;
        if(data.password){
            if(! await HastServices.ValidatePassword(data.password, cekUser.password)) throw({status: 400, message: "Password wrong"});
            if(data.password === data.new_password) throw({status: 400, message: "the password cannot be the same as the old one"});
            if(!data.new_password) throw({status: 400, message: "New password required"});
            if(!data.confirm_password) throw({status: 400, message: "Confirm new password required"});
            if(data.new_password !== data.confirm_password) throw({status: 400, message: "new password and confirm password not match"});
            cekUser.password = await HastServices.HastPassword(data.new_password);
        }
        await UserModel.findOneAndUpdate({_id: id}, cekUser);
        return "update ok";
    }

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