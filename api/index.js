const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

//dotenv for enviroment variables
dotenv.config({path:"./config.env"});
const PORT = process.env.PORT;
require("./db/conn");

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.get("/",(req,res)=>{
  res.send("Hello world!!")
});

app.listen(PORT,(req,res)=>{
    console.log(`Server running successfuly on PORT ${PORT}`);
});