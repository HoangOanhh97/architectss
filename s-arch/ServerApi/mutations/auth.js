const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // throw new Error('No user with that email');
            return res.send({ success: false, message: 'Invalid email and password.' });
        }
        const isValid = await bcrypt.compareSync(req.body.password, user.password)
        if (user === undefined || !isValid) {
            // throw new Error('Incorrect password')
            return res.send({ success: false, message: 'Incorrect password.' });
        }
        // if user is found and password is right, create a token with only our given payload
        delete user.password;
        const payload = { id: user["_id"], email: user["email"] };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "600d"
        });

        return {
            success: true,
            message: 'token is generated!',
            token,
            user
        };
    } catch (error) {
        console.log("Error authenticate ", err);
    }
})


module.exports = router;