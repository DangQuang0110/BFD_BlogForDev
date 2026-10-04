import express from "express";
import bodyParser, { json } from "body-parser";
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
app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { blogs: blogStorage });
});
app.get("/contacts",(req, res)=>{
    res.render("contacts.ejs");
})
app.get("/about",(req, res)=>{
    res.render("aboutMe.ejs");
})
// app.get("/addblog",(req, res)=>{
//     res.render("addBlog.ejs");
// })

//Add Blogs
app.post("/addblog", (req, res)=>{
    const {title, author, content, image} = req.body;
    blogStorage.push({
        id: blogStorage.length + 1,
        title,
        author,
        content,
        image,
    });
    res.redirect("/blogs");
    console.log(blogStorage);
})
app.get("/api/blogs", (req, res) => {
    res.json(blogStorage);
});
// detail blog
app.get("/blogs/:id", (req, res) => {
    const blog = blogStorage.find(b => b.id === Number(req.params.id));

    if (!blog) {
        return res.status(404).send("Không tìm thấy bài viết");
    }

    res.render("viewDetailBlog.ejs", { blog });
});

//update blog
app.put("/blogs/:id", (req, res)=>{
    const id = Number(req.params.id);
    const blog = blogStorage.find(b => b.id === id);
     if (!blog) {
        return res.status(404).send("Không tìm thấy bài viết");
    }
     const { title, author, content, image } = req.body;

    blog.title = title;
    blog.author = author;
    blog.content = content;
    blog.image = image;
    res.json(blog);
})
app.delete("/api/blogs/:id",(req, res)=>{
    const id = Number(req.params.id);
    const blog = blogStorage.findIndex(b => b.id === id);
     if (blog === -1) {
        return res.status(404).send("Không tìm thấy bài viết");
    }else{
        const [removed] = blogStorage.splice(blog, 1);
        res.json({message: "Đã xóa", blog:removed});
    }
})
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});