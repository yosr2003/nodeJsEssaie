import express from "express";
import UserController from "../controllers/UserController.js"; // Correct import

const route = express.Router();

route.get("/users", UserController.all); // Correct usage
route.post("/users/create", UserController.create);


export default route;
