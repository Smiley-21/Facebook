const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const morgan=require("morgan");
const helmet=require("helmet");

const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");

dotenv.config();


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("MongoDB connected successfully");
});


// middleware 
app.use(express.json()); // body parser when making post request
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.get("/",(req,res)=>{
    res.send("Welcome to Home page");
});


app.get("/users",(req,res)=>{
    res.send("Welcome to user page");
});






app.listen(8800,()=>{
    console.log("Backend Server started Successfully");
});

