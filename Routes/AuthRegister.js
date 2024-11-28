import express from "express";
import authRegisterController from "../controllers/authRegisterController.js"; 

const route = express.Router();

  route.get('/authRegister', (req, res) => {
    res.render('authRegister', { layout: false });
  });  

  route.post('/authRegister/signup', (req, res) => {
    authRegisterController.userSignUp(req, res);
  });
  route.post('/authRegister/signin', (req, res) => {
    authRegisterController.userLogin(req, res);
  });
  
  

export default route;