const {Router} = require('express');
const User = require('../models/user');

const router = Router();

router.get('/Login', (req, res) => {
    res.render('Login');
});

router.get('/Signup', (req, res) => {
    res.render('Signup');
});

router.post('/Login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);
    console.log("User", user);
    res.redirect('/');
});

router.post('/Signup', async (req, res) => {
    const {firstName, email, password} = req.body;
    await User.create({firstName, email, password});
    res.redirect('/');
});

module.exports = router;