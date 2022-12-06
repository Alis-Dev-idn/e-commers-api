import {config} from "dotenv";
config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import https from "https";
import fileUpload from "express-fileupload";
import fs from "fs";
import {ConnectDb} from "../database/database.js";
import Routes from "../routes/routes.js";

const StartServer = () => {
    let server;
    const host = process.env.HOST_URL;
    const port = process.env.HOST_PORT;

    const url_db = process.env.MONGODB_URL;
    const port_db = process.env.MONGODB_PORT;
    const user_db = process.env.MONGODB_USER;
    const pwd_db = process.env.MONGODB_PWD;
    const db = process.env.MONGODB_DB;

    const app = express();

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json({limit: "10MB"}));
    app.use(express.urlencoded({extended: false}));
    app.use(fileUpload({limit: {fileSize: 50*1024*1024}}));

    if(process.env.USE_SSL === "true"){
        const config = {
            key: fs.readFileSync(process.env.KEY_SSL),
            cert: fs.readFileSync(process.env.CERT_SSL)
        }
        server = https.createServer(config, app);
    }else{
        server = http.createServer(app);
    }

    app.use("/", Routes);

    server.listen(port, () => {
        ConnectDb(url_db, port_db, user_db, pwd_db, db);
        console.log(`Server is running in ${process.env.USE_SSL === "true"? "https://" : "http://"}${host}:${port}`)
    });
}

export default StartServer;

