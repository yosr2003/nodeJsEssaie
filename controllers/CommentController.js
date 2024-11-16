import Comment from "../Models/Comment.js"; 

const CommentController = {
addComment: async (req, res) => {
  try {
    const { userId, candidatId, commentaire } = req.body;

    const newComment = new Comment({
      user: userId,
      candidat: candidatId,
      commentaire,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
},

 getCommentsByUser : async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const comments = await Comment.find({ user: userId }).populate("candidat", "nom prenom");
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
  },

  
   getCommentsByCandidat : async (req, res) => {
    try {
      const candidatId = req.params.candidatId;
  
      const comments = await Comment.find({ candidat: candidatId }).populate("user", "nom prenom");
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
  },
};
  export default CommentController;
  