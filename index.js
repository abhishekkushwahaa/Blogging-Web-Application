const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/blogbrust').then(() => console.log('Connected to MongoDB'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user', userRouter);

app.listen(port, () => console.log('Listening on port 3000'));