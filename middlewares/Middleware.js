require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    // console.log(req.body.token);
    // console.log(req.cookies.token);
    // console.log(req.header["Authorization"].replace("Bearer ", ""));
    const token = req.headers["authorization"].replace("Bearer ","");
    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }
    
  } catch (err) {
    return res.status(400).json({
        success:false,
        message:'Kharab hogya kch Bhai'
    })
  }
}
function isStudent(req, res, next) {}
function isAdmin(req, res, next) {}
module.exports = { auth, isStudent, isAdmin };
