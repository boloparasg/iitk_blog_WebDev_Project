import express from 'express'
const router = express.Router({ mergeParams: true });
import { postComment, getComment, deleteComment, updateComment } from '../controllers/comment.js';

router.post("/post", async (req, res) => {
  postComment(req, res);
});

router.get("/:id", async (req, res) => {
  getComment(req, res);
});

router.delete("/:id", async (req, res) => {
  deleteComment(req, res);
});

router.patch("/:id", async (req, res) => {
  updateComment(req, res);
}
);

export default router;