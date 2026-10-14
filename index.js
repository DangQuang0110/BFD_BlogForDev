import express from "express";
const app = express();
const port = 8080;

const blogStorage = [];
let nextId = 1;

app.use(express.static("publics"));
app.use(express.urlencoded({ extended: true })); // đọc dữ liệu từ <form>
app.use(express.json());                         // đọc JSON từ fetch / Postman

// ---------- Pages ----------
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/home", (req, res) => {
    res.render("index.ejs");
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { blogs: blogStorage });
});

app.get("/blogs/:id", (req, res) => {
    const blog = blogStorage.find(b => b.id === Number(req.params.id));

    if (!blog) {
        return res.status(404).send("Không tìm thấy bài viết");
    }

    res.render("viewDetailBlog.ejs", { blog });
});

app.get("/contacts", (req, res) => {
    res.render("contacts.ejs");
});

app.get("/about", (req, res) => {
    res.render("aboutMe.ejs");
});

// ---------- Add blog (từ form) ----------
app.post("/addblog", (req, res) => {
    const { title, author, content, image } = req.body;
    blogStorage.push({
        id: nextId++,
        title,
        author,
        content,
        image,
    });
    res.redirect("/blogs");
});

// ---------- API (JSON) ----------
app.get("/api/blogs", (req, res) => {
    res.json(blogStorage);
});

app.get("/api/blogs/:id", (req, res) => {
    const blog = blogStorage.find(b => b.id === Number(req.params.id));

    if (!blog) {
        return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.json(blog);
});
// update post
app.put("/api/blogs/:id",(req, res)=>{
    const blog = blogStorage.find(b => b.id === Number(req.params.id));
    if(!blog){
        return res.status(404).json({message:"Không tìm thấy bài viết"});
    }

    const { title, author, content, image} = req.body;
    if(title !== undefined) blog.title = title;
    if(author !== undefined) blog.author = author;
    if(content !== undefined) blog.content = content;
    if(image !== undefined) blog.image = image;

    res.json(blog);
    console.log(blog);
});
// app.delete("/api/blogs/:id", (req, res) => {
//     const index = blogStorage.findIndex(b => b.id === Number(req.params.id));

//     if (index === -1) {
//         return res.status(404).json({ message: "Không tìm thấy bài viết" });
//     }

//     const [removed] = blogStorage.splice(index, 1);
//     res.json({ message: "Đã xóa", blog: removed });
// });

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});