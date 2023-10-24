const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path=require('path');

dotenv.config();

//mongodb Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("MongoDB default connection error : " + err);
});
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});

// middleware
app.use("/images", express.static(path.join(__dirname,"public/images")));
app.use(express.json()); // body parser when making post request
app.use(helmet());
app.use(morgan("common"));


// configuration of storage
const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null,"public/images/post");
  },
  filename:(req,file,cb)=>{
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   
    cb(null,req.body.name);
  }
  });
const upload = multer({storage:storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if(!req.file)
    {
      res.status(400).json("No file uploaded");
      return;
    }
    res.status(200).json("File Uploaded successfully");
  } catch (err) {
    console.log("Error in Uploading");
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

app.get("/users", (req, res) => {
  res.send("Welcome to user page");
});

app.listen(8800, () => {
  console.log("Backend Server started Successfully");
});
