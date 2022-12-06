import {CreateResponse} from "../../utils/utils.js";
import {JoiServices, UserServices} from "../../services/services.js";


const UpdateUser = async (req, res) => {
    try{
        const body = req.body;
        const id = req._id;
        const {error} = await JoiServices.UserUpdate.validate(body);
        if(error) return CreateResponse(res, 400, {error: error.details[0].message});
        const result = await UserServices.UserUpdate(id, body);
        CreateResponse(res, 200, {status: "success", message: result});
    }catch (error) {
        if(error.status) return CreateResponse(res, error.status, {error: error.message});
        CreateResponse(res, 500, {error: "Internal Error"});
    }
}

export default UpdateUser;