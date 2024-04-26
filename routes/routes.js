const express = require('express');
const router = express.Router();
const {login} = require('../controllers/auth.js')
const {signup} = require('../controllers/auth.js')
const {auth,isStudent,isAdmin} = require('../middlewares/Middleware.js')

router.post('/login',login);
router.post('/signup',signup);

router.get('/test',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Auth success'
    })
})
router.get('/student',auth,isStudent,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Student Dashboard access'
    })
})
router.get('/test',auth,isAdmin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Admin Dashboard access'
    })
})


module.exports = router