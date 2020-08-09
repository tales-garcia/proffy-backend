const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/users', async (req, res) => {
        try {
            const user = await User.create(req.body);
            return res.status(201).send({user});
        } catch (e) {
            console.log(e)
            return res.status(500).send({ err: 'Registration failed' })
        }
    }
);

module.exports = app => app.use('/auth', router);