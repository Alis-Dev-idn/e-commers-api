import {CreateResponse, DbValidate} from "../../utils/utils.js";
import {UserServices} from "../../services/services.js";


const GetUser = async (req, res) => {
    try{
        const query = req.query;
        if(query.id) return await GetById(res, query.id);
        const response = await UserServices.GetUser("all");
        CreateResponse(res, 200, response);
    }catch (error){
        CreateResponse(res, 500, {error: "Internal Error"});
    }
}

const GetById = async (res, id) => {
    if(!DbValidate(id)) return CreateResponse(res, 400, {error: "Id Not Valid"});
    const response = await UserServices.GetUser("id", id);
    if(!response) return CreateResponse(res, 404, {error: `User By id '${id}' not Found`});
    CreateResponse(res, 200, {data: response});
}

export default GetUser;