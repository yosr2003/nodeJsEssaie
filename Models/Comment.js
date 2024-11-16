import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for the Comment
const commentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  candidat: {
    type: Schema.Types.ObjectId,
    ref: "candidat",
    required: true,
  },
  commentaire: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }


});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
