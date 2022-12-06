import {CreateResponse, DbValidate} from "../../utils/utils.js";
import {UserServices} from "../../services/services.js";


const DeleteUser = async (req, res) => {
    try{
        const data = req.params;
        if(!data.id) return CreateResponse(res, 400, {error: "Id required"});
        if(!DbValidate(data.id)) return CreateResponse(res, 400, {error: "Id not valid"});
        if(! await UserServices.GetUser("id", data.id)) return CreateResponse(res, 400, {error: "Id not found"});
        await UserServices.DeleteUser(data.id);
        CreateResponse(res, 200, {error: "Delete Success"});
    }catch (error){
        console.log(error);
        CreateResponse(res, 500, {error: "Internal Error"});
    }
}

export default DeleteUser;