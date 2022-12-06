import joi from "joi";


class JoiServices {
    static CreateUser = joi.object({
        username: joi.string().min(5).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        no_hp: joi.number().min(11).required(),
        date_brith: joi.date().required(),
        gender: joi.string().required()
    });

    static UserLogin = joi.object({
        username: joi.string().min(5).required(),
        password: joi.string().min(6).required()
    })
}

export default JoiServices;