import mongoose from "mongoose";
const { Schema } = mongoose;
// Define the schema for the user entity
const userSchema = new mongoose.Schema({
  // Define the name property with type String and required constraint
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
  // Define the address property with type String and required constraint
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

  

// Create and export the Mongoose model for the "users" collection based on the userSchema
export default mongoose.model("User", userSchema);