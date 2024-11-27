import express from "express";
import CommentController from "../controllers/CommentController.js"; // Correct import

const router = express.Router();

router.post("/comment", CommentController.addComment); // Endpoint to add a comment
router.get("/comments/candidat/:candidatId", CommentController.getCommentsByCandidat); // Endpoint to get comments for a candidat
router.get("/comments/user/:userId", CommentController.getCommentsByUser); // Endpoint to get comments by a user

export default router;



