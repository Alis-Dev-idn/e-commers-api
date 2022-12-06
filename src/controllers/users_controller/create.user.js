import {CreateResponse} from "../../utils/utils.js";
import {v4} from "uuid";
import {HastServices, JoiServices, MailServices, UserServices} from "../../services/services.js";
import e from "express";


const CreateUser = async (req, res) => {
    try{
        const body = req.body;
        const {error} = JoiServices.CreateUser.validate(body);
        if(error) return CreateResponse(res, 400, {error: error.details[0].message});
        if(await UserServices.GetUser("username", body.username)) return CreateResponse(res, 400, {error: "Username is Ready Used"});
        if(await UserServices.GetUser("email", body.email)) return CreateResponse(res, 400, {error: "Email is Ready Used"});
        body.password = await HastServices.HastPassword(body.password);
        body.code = v4();
        await UserServices.CreateUser(body);
        await MailServices.SendMail(body.username, body.email, body.code);
        CreateResponse(res, 200, {message: "Ok"});
    }catch (error){
        console.log(error);
        CreateResponse(res, 500, {error: "Internal Error"})
    }
}

export default CreateUser;