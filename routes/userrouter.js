var express = require('express')
const router = express.Router();
var mongoose = require('mongoose')
var url = "mongodb://localhost/Library"
var users = require("../model/User"); 
var bodyparser = require('body-parser')
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
router.use(bodyparser.urlencoded({extended:true}))
router.get("/",function(req,res){
    res.render("login",{pTitle:"Library",nav:[]});
    });
router.get("/login",function(req,res){
    res.redirect('/');
    });

router.get("/signup",function(req,res){
    res.render("signup",{pTitle:"Library",nav:[]});
    
    });
router.post("/signup",function(req,res){
    
        var u1 = new users();
        u1.username = req.body.unr;
        u1.name = req.body.nr;
        u1.password=req.body.pwr;
        u1.mobile=req.body.mr;
        u1.email=req.body.er;
        u1.role=req.body.role;
        u1.save(function(err){
            if(err) throw err;
            else
            res.redirect('/')
        })
});

router.post("/login",function(req,res){
    users.find({username:req.body.un,password:req.body.pw},function(err,result){
        if(err) 
        throw err;
        else if(result.length == 0)
        {
            res.redirect('/');
        }
        else
        {
            res.redirect('/index');
        }
    })
   
    });

    module.exports = router;