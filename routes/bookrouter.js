var express = require('express')
const router = express.Router();
var book_arr = [
    {
       title:"City of Joy",
       genre:"Fiction",
       author:"Dominique Lapierre",
       image:"http://t3.gstatic.com/images?q=tbn:ANd9GcR4s3klXwwLcHnXyc-ymOo8ZjdbwFJt9z0H7qm-v4CiRZLlzLr-"     
    },
    {
        title:"Under the Dome",
        genre:"Fiction",
        author:"Stephen King",
        image:"https://images-na.ssl-images-amazon.com/images/I/41PZik3LNWL._SX341_BO1,204,203,200_.jpg"
    },
    {
        title:"White Fang",
        genre:"Fiction",
        author:"Jack London",
        image:"https://images-na.ssl-images-amazon.com/images/I/41cnA1XZPmL.jpg"   
    }
]   
module.exports = router;
router.get("/",function(req,res){
    res.render("books",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"}],books:book_arr});
})
router.get("/sp/:id",function(req,res){
    res.render("bookdesc",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"}],books:book_arr[req.params.id]});
 })
