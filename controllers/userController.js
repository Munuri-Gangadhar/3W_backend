const User=require('../models/User');

const createUser=async(req,res)=>{
   try{
    const {name,socialMediaHandle}=req.body;
    const imagePaths=req.files.map(file=>`/uploads/${file.filename}`);

    const user=new User({
      name,
      socialMediaHandle,
      imagePaths
    });
    await user.save();
    res.status(201).json({message:'User submitted successfully',user});
   }catch(err){
    res.status(400).json({message:err.message});
   }
}

const getUsers=async(req,res)=>{
    try{
      const users=await User.find();
      res.status(200).json(users);

    }catch(err){
      res.status(400).json({message:err.message})
    }
}

module.exports={createUser,getUsers}