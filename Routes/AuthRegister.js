import express from "express";


const route = express.Router();

  route.get('/authRegister', (req, res) => {
    res.render('authRegister', { layout: false });
  });  
  



export default route;