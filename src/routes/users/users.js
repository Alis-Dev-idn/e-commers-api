import {Router} from "express";

const Users = Router();

Users.get("/", (req, res) => {
    res.status(200).json({message: "Users ok"});
});

export default Users;