import bcrypt from 'bcryptjs';
import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";
const authRegisterController = {

    userSignUp: async (req, res) => {
        console.log(req.body);
        const { cin, nom, prenom, dateNais, address, email, motDePasse } = req.body;


        if (!nom || !prenom || !motDePasse) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }

        const existUserCheck = await UserModel.findOne({ email });
        if (existUserCheck) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashPassword = await bcrypt.hash(motDePasse, 10);

        // Create the new user
        const user = await UserModel.create({
            cin, nom, prenom, dateNais, address, email, motDePasse: hashPassword,
        });

        // Redirect after successful signup
        res.redirect(`/users/${cin}`);
    },

    userLogin: async (req, res) => {
       const {email, motDePasse}=req.body;
       const user= await UserModel.findOne({ email });
       if (!user){
        res.status(404).json({message:"user not found"});
       } 
       if (user && (await bcrypt.compare(motDePasse, user.motDePasse))){
        const token=jwt.sign(
            {
                email:user.email, nom: user.nom, cin:user.cin
            }, process.env.SECRET_KEY  );
        res.cookie("token", token );
        return res.redirect(`/users/${user.cin}`);
       }

    }

};

export default authRegisterController;
