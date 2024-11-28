import express from "express";
import CandidatController from "../controllers/CandidatController.js"; 
import validateToken from "../middlewares/auth.js"
const route = express.Router();

route.get("/candidats/:cin",validateToken, CandidatController.all); 
route.get("/DetailsCandidats/:cin/ForUser/:cin1",validateToken, CandidatController.find);
route.get('/Favoris', (req, res) => {
    res.render('Favoris'); 
  }); 
route.get("/favoris/:cin",validateToken,CandidatController.favorites); 
route.post('/toggleFavorite',validateToken, CandidatController.toggleFavorite);
route.post('/voteCandidate',validateToken, CandidatController.voteCandidate);
route.get('/resultatElection',validateToken, (req, res) => {
    res.render('resultatElection'); 
  });  
  
route.post("/candidats/create",validateToken, CandidatController.create);
route.get('/searchCandidate',validateToken, CandidatController.searchCandidate);




export default route;
