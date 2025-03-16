import express from 'express'
const router =express.Router({mergeParams:true});
import User from './../models/User.js'
import mongoose from 'mongoose';

router.post("/post", async(req, res) => {
  try{
  const newUser = req.body;
  const new_User = new User(newUser);
  await new_User.save();
  res.json(newUser);
}
    catch(err){
      res.status(500).json({error:err});
      console.log(err);
    }
});

router.get("/:id", async(req, res) => {
  try{
  const id= req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const user= await User.findOne({_id:id});
  if(!user) return res.status(404).json({error:"User not found"});
  res.json(user);
}
catch(err){
  res.status(500).json({error:err});
  console.log(err);
}
});

router.delete("/:id", async(req, res) => {
  try{
  const id= req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const user= await User.findOneAndDelete({_id:id});
  if(!user) return res.status(404).json({error:"User not found"}); 
  res.json(user);
}
catch(err){
  res.status(500).json({error:err});
  console.log(err);
} 
});

router.patch("/:id", async(req, res) => {
  try{
  const id= req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const user= await User.findOneAndUpdate({_id:id},{$set: req.body},{new:true,runValidators:true});
  if(!user) return res.status(404).json({error:"User not found"});
  res.json(user);
}
catch(err){
  res.status(500).json({error:err});
  console.log(err);
}
});


export default router;