import jwt from "jsonwebtoken";
import {config} from "dotenv";
import {CreateResponse} from "../utils/utils.js";
config();

const validateToken = (req, res, next) => {
    let key = req.headers.authorization;
    if(!key) return CreateResponse(res, 401, {error: "token required"});
    try{
        key = key.split(" ");
        jwt.verify(key[1], process.env.SECREAT_KEY_1);
        const decode = jwt.decode(key[1]);
        req._id = decode.data.id;
        next();
    }catch (error){
        CreateResponse(res, 402, {error: "token expired"});
    }
}

export default validateToken;