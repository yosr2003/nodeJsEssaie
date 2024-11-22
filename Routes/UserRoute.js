import express from "express";
import UserController from "../controllers/UserController.js"; // Correct import

const route = express.Router();
route.post('/profil/:cin/update', UserController.update);

route.post("/users/create", UserController.create);

route.get("/users/:cin", UserController.find);

export default route;
