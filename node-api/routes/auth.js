const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    // generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const Newuser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      description: req.body.description,
      from: req.body.from,
      city: req.body.city,
      relationship: req.body.relationship,
    });

    // save user
    const user = await Newuser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    // checking of user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // checking of password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)
    return res.status(400).json("Incorrect Password Try again");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Server Error");
    console.log(err);
  }
});



module.exports = router;
