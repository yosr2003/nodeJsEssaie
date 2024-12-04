import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  cin: {
    type: Number,
    required: [true, "CIN est obligatoire"],
    validate: {
      validator: (v) => /^\d{8}$/.test(v),
      message: "CIN doit être un nombre à 8 chiffres",
    },
  },
  nom: {
    type: String,
    required: [true, "Nom est obligatoire"],
    minlength: [2, "Nom doit contenir au moins 2 caractères"],
  },
  prenom: {
    type: String,
    required: [true, "Prénom est obligatoire"],
    minlength: [2, "Prénom doit contenir au moins 2 caractères"],
  },

  dateNais: {
    type: Date,
    required: [true, "Date de naissance est obligatoire"],
  },

  address: {
    type: String,
    required:  [true, "Adresse est obligatoire"],
  },
  email: {
    type: String,
    required: [true, "Email est obligatoire"],
    validate: {
      validator: (v) => /^\S+@\S+\.\S+$/.test(v),
      message: "Format d'email invalide",
    },
  },
  motDePasse: {
    type: String,
    required: [true, "Mot de passe est obligatoire"],
    minlength: [6, "Mot de passe doit contenir au moins 6 caractères"],
  },
  ElectionCandidat:{
    type: Schema.Types.ObjectId,
    ref:"candidat"
  },
  CandidatsFavoris:[{
    type: Schema.Types.ObjectId,
    ref:"candidat"
  }],
  
}, { timestamps: true }); 

  
export default mongoose.model("User", userSchema);