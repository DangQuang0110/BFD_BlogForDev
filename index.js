import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 8080;
const blogStorage = [];
app.use(express.static("publics"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})
//Method getPage
app.get("/home",(req, res)=>{
    res.render("index.ejs");
})
app.get("/blogs",(req, res)=>{
    res.render("blogs.ejs");
})
app.get("/contacts",(req, res)=>{
    res.render("contacts.ejs");
})
app.get("/about",(req, res)=>{
    res.render("aboutMe.ejs");
})
app.get("/addblog",(req, res)=>{
    res.render("addBlog.ejs");
})

//Add Blogs
app.post("/addblog", (req, res)=>{
    const {title, author, content, picture} = req.body;
    blogStorage.push({
        id: blogStorage.length + 1,
        title,
        author,
        content,
        picture,
    });
    res.redirect("/blogs");
    console.log(blogStorage);
})
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});