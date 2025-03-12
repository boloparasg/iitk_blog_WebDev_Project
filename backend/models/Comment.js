const mongoose=require('mongoose');

import User from './User';
import Blog from './Blog';


const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    ParentBlogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Upvote:{
        type:Number,
        default:0
    },
    Downvote:{
        type:Number,
        default:0
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatedAt:{
        type:Date,
        default:Date.now
    }, 
    IsReported:{
        type:Boolean,
        default:false
    },  
});

export default mongoose.model('Comment',commentSchema);