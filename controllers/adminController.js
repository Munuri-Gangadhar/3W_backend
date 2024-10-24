const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');

dotenv.config();

const adminLogin=(req,res)=>{
    const {username,password}=req.body;
    if(username===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD){
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Admin login successful', token });
    }else{
        res.status(401).json({message:'Invalid credentials provided'})
    }
}