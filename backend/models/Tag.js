import mongoose from 'mongoose';
import Blog from './Blog.js';
const tagSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }],
    Description:{
        type:String
    }
});

export default mongoose.model('Tag',tagSchema);