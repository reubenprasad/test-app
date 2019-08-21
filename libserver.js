var express = require('express');

const app = express();
var authrouter = require("./routes/authrouter")
var bookrouter = require("./routes/bookrouter")
const path = require('path')
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"/public")))
app.use("/book",bookrouter);
app.use("/auth",authrouter);

app.get("/",function(req,res){
    res.render("index",{pTitle:"Library",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"}]});
    });

/* app.get("/book",function(req,res){
    res.render("books",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/author",title:"Author"}],books:book_arr});
})
app.get("/sp/:id",function(req,res){
   res.render("bookdesc",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/author",title:"Author"}],books:book_arr[req.params.id]});
})
app.get("/auth",function(req,res){
    res.render("books",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/author",title:"Author"}],books:book_arr});
}) */

    /* app.listen(2224, function(req,res){
        console.log("Server started listening")
    }) */
    app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000')); 