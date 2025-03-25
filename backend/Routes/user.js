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

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return v.endsWith('@iitk.ac.in');
      },
      message: 'Email must be from the iitk.ac.in domain'
    }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // Email verification fields
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationOTP: {
    type: String,
  },
  emailVerificationOTPExpiry: {
    type: Date,
  },
  // Two-factor authentication fields
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: {
    type: String,
  },
  twoFactorOTP: {
    type: String,
  },
  twoFactorOTPExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);

export default router;
