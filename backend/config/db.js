const mongoose=require('mongoose'); 

require('dotenv').config({ path: '../../.env' });
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
module.exports=db;