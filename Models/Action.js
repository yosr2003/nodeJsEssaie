import mongoose from "mongoose";
const { Schema } = mongoose;
// Define the schema for the user entity
const ActionSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});


export default ActionSchema;