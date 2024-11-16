import mongoose from "mongoose";
import ActionSchema  from "./Action.js";
const { Schema } = mongoose;

const ProgrammeElectoralSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  actions: [ActionSchema], 

});

export default ProgrammeElectoralSchema;