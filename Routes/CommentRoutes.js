import express from "express";
import CommentController from "../controllers/CommentController.js"; // Correct import
import validateToken from "../middlewares/auth.js"
const router = express.Router();

router.post("/comment",validateToken, CommentController.addComment); // Endpoint to add a comment
router.get("/comments/candidat/:candidatId",validateToken, CommentController.getCommentsByCandidat); // Endpoint to get comments for a candidat
router.get("/comments/user/:userId",validateToken, CommentController.getCommentsByUser); // Endpoint to get comments by a user

export default router;



