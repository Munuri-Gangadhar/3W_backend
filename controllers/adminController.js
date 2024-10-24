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


const verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports={adminLogin,verifyAdmin};