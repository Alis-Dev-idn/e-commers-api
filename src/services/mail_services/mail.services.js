import nodemailer from "nodemailer";
import {config} from "dotenv";
config();

class MailServices {
    static async SendMail(username, email, code) {
        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PWD
            }
        });

        let send = await transport.sendMail({
            from: `"Active Account" <no-replay@smpvanilla.com>`,
            to: email,
            subject: "Active Your Account",
            html: `<p>active account : 
                    <a href=\"${process.env.USE_SSL === "true"? `https://${process.env.HOST_URL_FRONDEND}/active?username=${username}&code=${code}`
                    : `http://${process.env.HOST_URL_FRONDEND}/active?username=${username}&code=${code}` }\">klik</a></p>`
        });
        return send.messageId;
    }
}

export default MailServices;