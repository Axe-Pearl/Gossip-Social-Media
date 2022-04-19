const mongoose = require("mongoose");

// connection to MongoDB
const URL = process.env.URL;
mongoose.connect(URL, {
    useNewUrlParser:true
})
.then(()=>{
    console.log("MongoDB connected Successfully!");
})
.catch((err)=>{
    console.log("Error: ",err);
});