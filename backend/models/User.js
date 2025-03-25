import mongoose from 'mongoose';
import User from './User.js';
import Comment from './Comment.js';
import Blog from './Blog.js';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],  
        required:true
    },
    profilePic:{
        type:String
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    JoinDate:{
        type:Date,
        default:Date.now,
    },
    IsBlocked:{
        type:Boolean,
        default:false
    },
    Bio:{
        type:String,
        default:""
    },
    Blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }],
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

export default mongoose.model('User',userSchema);
