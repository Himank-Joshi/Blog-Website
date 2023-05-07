//jshint esversion:6

const express = require("express");
const app = express();
const ejs = require("ejs");
//
const mongoose=require ("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/BlogDB');
mongoose.connect("mongodb+srv://himankjoshiwork:pass123@cluster0.lpd2x8m.mongodb.net/BlogDB",{useNewUrlParser: true})

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.static("public"));

//
const PostSchema =new mongoose.Schema({
  title : String,
  content : String
})
const Post =new mongoose.model("Post",PostSchema);


//home section
app.get("/",function(req,res){

  Post.find({}).then(function (posts) {
    res.render("home",{homeStartingContent:homeStartingContent,Posts:posts});
    });
})

//about section
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
})


//contact section
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
})

//compose section
app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/compose",function(req,res){
    const post= new Post({
      title:  req.body.postTitle,
      content:  req.body.postBody
    });
    post.save();
    res.redirect("/");
})

// variable section
app.get("/posts/:topic",function(req,res){
  const str = req.params.topic ;
  Post.findById(str)
  .then(function (post){        
          res.render("post",{title:post.title, content:post.content})
  })
  });

  app.listen(process.env.PORT || 3000,function(){
    console.log("server  running ON" +process.env.PORT);
})







//IMP-> Line50
// Route parameters
// Route parameters are named URL segments that are used to capture the values specified at their position in the URL.
// The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
// To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

// app.get('/users/:userId/books/:bookId', (req, res) => {
//   res.send(req.params)
// })