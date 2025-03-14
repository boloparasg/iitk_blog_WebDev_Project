import express from 'express'
const router =express.Router({mergeParams:true});
import User from './../models/User.js'


router.post("/post", (req, res) => {
  try{
  const newUser = req.body;
  const new_User = new User(newUser);
  new_User.save()
    .then(() => {
      console.log('User saved');
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
    })}
    catch(err){
      res.status(500).json({error:err});
      console.log(err);
    }
});
export default router;