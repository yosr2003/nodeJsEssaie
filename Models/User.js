import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  cin: {
    type: Number,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },

  dateNais: {
    type: Date,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  motDePasse: {
    type: String,
    required: true,
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