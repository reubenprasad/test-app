var express = require('express')
const router = express.Router();
const path = require('path');
var multer = require('multer');
var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('image');
var mongoose = require('mongoose')
var url = "mongodb://localhost/Library"
var books = require("../model/Book"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;
router.get("/",function(req,res){
    books.find({},function(err,result){
        
        res.render("books",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/book/updatebook", title:"Update Books"},{link:"/book/addbook",title:"Add New Book"},{link:"/",title:"Log Out"}],books:result});
    })
})
router.get("/sp/:title",function(req,res){
    console.log(req.params.title)
    books.find({title:req.params.title},function(err,result){
       

        res.render("bookdesc",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/book/updatebook", title:"Update Books"},{link:"/book/addbook",title:"Add New Book"},{link:"/",title:"Log Out"}],books:result});    })
        
 })
 router.get("/addbook",function(req,res){
    res.render("addbook",{pTitle:"Add New Book",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/book/updatebook", title:"Update Books"},{link:"/book/addbook",title:"Add New Book"},{link:"/",title:"Log Out"}]});
    });

 router.post("/addbook",upload, function(req,res){
     var b = new books();
     b.title = req.body.title;
     b.author = req.body.author;
     b.genre = req.body.genre;
     b.image = req.file.filename;
     b.save(function(err){
        if (err) throw err;
        else{
            console.log("Added");
            res.redirect("/");
        }
    })
    })

router.get("/view/:img",function(req,res){    
        res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

router.get("/updatebook",function(req,res){
        books.find({},function(err,result){
            if (err) throw err;
            else
                res.render("updatebook",{pTitle:"Library",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/book/updatebook", title:"Update Books"},{link:"/book/addbook",title:"Add New Book"},{link:"/",title:"Log Out"}],books:result}
                );
        }) 
})
    
router.get("/updatebook/:id",function(req,res){
        books.find({title:req.params.id},function(err,result){
            if (err) throw err;
            else res.render("editbook",{pTitle:"Library",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/book/updatebook", title:"Update Books"},{link:"/book/addbook",title:"Add New Book"},{link:"/",title:"Log Out"}],books:result});
        })
})
    
router.post("/editbook", upload, function(req,res){
        books.updateOne({title:req.body.title} ,{$set:{
            title:req.body.title,
            author : req.body.author,
            genre : req.body.genre,
            image : req.file.filename
        }}, function(err,result){
            if (err) throw err;
            else{
                books.find({},(err,result)=>{
                    if (err) throw err;
                    else
                        res.redirect("/book/updatebook")
                })
            }
        }) 
    })
    
    router.get("/deletebook/:bid",function(req,res){
        books.deleteOne({title:req.params.bid},function(err,result){
            if (err) throw err;
            else
            {
                books.find({},(err,result)=>{
                    if(err) throw err;
                    else
                        res.redirect("/book/updatebook")
                })
            }
        })
    })


