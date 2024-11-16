import express from "express";
import CandidatController from "../controllers/CandidatController.js"; // Correct import

const route = express.Router();

route.get("/candidats", CandidatController.all); 
route.post("/candidats/create", CandidatController.create);


export default route;
