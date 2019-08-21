var express = require('express')
const router = express.Router();
var mongoose = require('mongoose')
var url = "mongodb://localhost/Library"
var authors = require("../model/Author"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;

router.get("/",function(req,res){
    authors.find({},function(err,result){
        
        res.render("auth",{pTitle:"Authors",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/",title:"Log Out"}],authors:result});
    })
})
router.get("/sa/:author",function(req,res){
    console.log(req.params.author)
    authors.find({author:req.params.author},function(err,result){
       

        res.render("authdesc",{pTitle:"Authors",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/",title:"Log Out"}],authors:result});    })
        
 })

