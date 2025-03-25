import express from 'express'
const router = express.Router({ mergeParams: true });
import { createUser, getUser, deleteUser, updateUser,loginUser} from './../controllers/user.js';

router.post("/post", async (req, res) => {
  createUser(req, res);
});


router.get("/login", async (req, res) => {
  loginUser(req, res);
});

router.get("/:id", async (req, res) => {
  getUser(req, res);
});

router.delete("/:id", async (req, res) => {
  deleteUser(req, res);
});

router.patch("/:id", async (req, res) => {
  updateUser(req, res);
});

module.exports = mongoose.model('User', UserSchema);

export default router;
