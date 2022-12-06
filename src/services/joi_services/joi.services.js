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
    });

    static UserUpdate = joi.object({
        username: joi.string().min(5).allow(null),
        email: joi.string().email().allow(null),
        password: joi.string().min(6).allow(null),
        new_password: joi.string().min(6).allow(null),
        confirm_password: joi.string().min(6).allow(null),
        no_hp: joi.number().min(11).allow(null),
        date_brith: joi.date().allow(null),
        gender: joi.string().allow(null)
    })
}

export default JoiServices;