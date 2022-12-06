import {Router} from "express";
import {UsersController} from "../../controllers/controllers.js"

const Users = Router();

Users.get("/", UsersController.GetUser);
Users.post("/", UsersController.CreateUser);
Users.delete("/:id", UsersController.DeleteUser);

export default Users;