import express from "express";
import CandidatController from "../controllers/CandidatController.js"; // Correct import

const route = express.Router();

route.get("/candidats/:cin", CandidatController.all); 
route.get('/DetailsCandidats', (req, res) => {
    res.render('detailsCandidats'); 
  });
route.get('/Favoris', (req, res) => {
    res.render('Favoris'); 
  }); 
  route.get('/resultatElection', (req, res) => {
    res.render('resultatElection'); 
  });  
  
route.post("/candidats/create", CandidatController.create);


export default route;
