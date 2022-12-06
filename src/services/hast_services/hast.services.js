import bcrypt from "bcrypt";

class HastServices {
    static async HastPassword(password) {
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(password, salt);
    }

    static async ValidatePassword(password, hast) {
        return await bcrypt.compare(password, hast);
    }
}

export default HastServices;