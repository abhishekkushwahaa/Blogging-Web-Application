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
    try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("token", token);

    res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('Login', {error: "Invalid email or password"});
    }
});

router.get('/Logout', (req, res) => {
    res.clearCookie('token').redirect('/');
});

router.post('/Signup', async (req, res) => {
    const {firstName, email, password} = req.body;
    await User.create({firstName, email, password});
    res.redirect('/');
});

module.exports = router;