const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("Hello World from server");
})

module.exports = router;
