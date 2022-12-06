import {CreateResponse} from "../../utils/utils.js";
import {JoiServices, UserServices} from "../../services/services.js";


const LoginUser = async (req, res) => {
    try{
        const body = req.body;
        const {error} = JoiServices.UserLogin.validate(body);
        if(error) return CreateResponse(res, 400, {error: error.details[0].message});
        const result = await UserServices.UserLogin(body.username, body.password);
        CreateResponse(res, 200, {status: "success", data: result});
    }catch (error) {
        CreateResponse(res, error.status, {error: error.message});
    }
}

export default LoginUser;