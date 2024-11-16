import mongoose from "mongoose";
import ProgrammeElectoralSchema from "./ProgrammeElectoral.js";
const { Schema } = mongoose;
// Define the schema for the user entity
const CandidatSchema = new mongoose.Schema({
  cin: {
    type: Number,
    required: true,
  },
  nbVote: {
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
  PartPolytique: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: true,
  },
  Biographie: {
    type: String,
    required: true,
  },
  PhotoURL: {
    type: String,
    required: true,
  },
  socialMedia: {
    type: String,
    required: true,
  },
  usersVotés:[{
    type: Schema.Types.ObjectId,
    ref:"User"
  }]
  ,
  FavorisésPar:[{
    type: Schema.Types.ObjectId,
    ref:"User"
  }],
  Programmes: [ProgrammeElectoralSchema], 
});

  

// Create and export the Mongoose model for the "users" collection based on the userSchema
export default mongoose.model("candidat", CandidatSchema);