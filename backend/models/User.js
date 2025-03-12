const mongoose=require('mongoose');
import User from './User';
import Comment from './Comment';
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
        required:true
    },
    IsBlocked:{
        type:Boolean,
        default:false
    },
    Bio:{
        type:String,
        default:""
    },
});

export default mongoose.model('User',userSchema);