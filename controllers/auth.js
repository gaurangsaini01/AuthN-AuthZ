const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing Fields , Fill all fields Properly",
    });
  }
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "SignUp first Plz",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    const payload = {
      email:user.email,
      id:user._id,
      role:user.role
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
    // user.token = token;
    // user.password = undefined;
    res.cookie('token',token,user).status(200).json({
      success:true,
      message:'LoggedIn Successfully'
    })
  } else {
    res.status(400).json({
      success: false,
      message: "Incorrect Password",
    });
  }
}

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Fields , Fill all fields Properly",
      });
    }
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Already signed up, Go plz login",
      });
    }
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(501).json({
        success: false,
        message: "Couldn't hash password",
      });
    }
    user = await User.create({
      name,
      email,
      password: hashedpassword,
    });
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in fetching from body",
    });
  }
}
module.exports = { login, signup };
