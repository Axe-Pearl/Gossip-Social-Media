const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");

router.get("/",(req,res)=>{
   res.send("Hello from auth Gossip");
})
router.post("/register", async(req,res)=>{
    const {username,
    email, password, profilePicture, 
    coverPicture, followers, followings, desc,
    city, from, relationships} = req.body;
    if(!username || !email || !password){
        return res.status(401).json({message:"Fill all the credentials"});
    }
    try{
        const userExist = await User.findOne({email:email});
        if(!userExist){
           const newUser = new User({username,
           email, password, profilePicture, 
           coverPicture, followers, followings, desc,
           city, from, relationships});
           //middleware to hash password will be called here
           const user = await newUser.save();
           return res.status(202).json({message:"User registered successfully!"});
        }
        else{
            return res.status(401).json({message:"User already Exists"});
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Fill all the credentials"});
    }
    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
           const isMatch = await bcyrpt.compare(password, userExist.password);
           if(isMatch){
            const accessToken = jwt.sign(
                {_id:userExist._id, isAdmin: userExist.isAdmin},
                process.env.SECRET_KEY
            );
             const user = userExist._doc; 
             return res.status(200).json({message:"User login successfully!",user:{...user, accessToken}});
           }
           return res.status(401).json({message: "Invalid Email or Password"})
        }
        return res.status(400).json({message: "User does not exists"});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;