const router = require("express").Router();
const verify = require("../verifyToken");

router.get("/",verify, (req,res)=>{
   console.log("yeah");
});

module.exports = router;
