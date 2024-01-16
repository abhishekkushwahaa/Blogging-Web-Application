const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const { checkForAuthenticationCookie } = require('./middleware/auth');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

// Middleware to serve static files
app.use(express.static(path.resolve('./assets/')));
app.use(express.static('./assets/uploads/'));

// Connect to MongoDB
// localhost:default is the name of the database in MongoDB
mongoose.connect('mongodb://localhost:default/blogbrust').then(() => console.log('Connected to MongoDB'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(port, () => console.log('Listening on port 3000'));