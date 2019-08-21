var express = require('express');

const app = express();
var authrouter = require("./routes/authrouter")
var bookrouter = require("./routes/bookrouter")
var userrouter = require("./routes/userrouter")
var bodyparser = require('body-parser')
/* var mongoose = require('mongoose')
var url = "mongodb://localhost/Library"
var users = require("./model/User"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
}); */
const path = require('path')
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"/public")))
app.use("/book",bookrouter);
app.use("/auth",authrouter);
app.use("/user", userrouter)
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){
   res.redirect('/user')
    });

app.get("/index",function(req,res){
    res.render("index",{pTitle:"Library",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/",title:"Log Out"},{link:"/book/addbook",title:"Add New Book"}]});
    });

app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000')); 
   