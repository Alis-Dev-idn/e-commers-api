import {Router} from "express";
import {UsersController} from "../../controllers/controllers.js"
import validateToken from "../../middleware/middleware.js";

const Users = Router();

Users.get("/", validateToken, UsersController.GetUser);
Users.post("/", UsersController.CreateUser);
Users.delete("/:id", validateToken, UsersController.DeleteUser);

export default Users;