import mongoose from 'mongoose';
import Blog from './Blog.js';
const tagSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
});

export default mongoose.model('Tag',tagSchema);