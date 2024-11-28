import express from "express";
import UserController from "../controllers/UserController.js"; // Correct import
import validateToken from "../middlewares/auth.js"
const route = express.Router();
route.post('/profil/:cin/update',validateToken,  UserController.update);

route.post("/users/create",validateToken, UserController.create);

route.get("/users/:cin",validateToken, UserController.find);

export default route;
