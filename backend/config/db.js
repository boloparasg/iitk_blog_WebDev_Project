import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();
const mongoURL=process.env.MONGO_URL;
mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.on('open',()=>{
    console.log('Connected to MongoDB');
});
db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB');
});
export default db;