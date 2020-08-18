const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

function generateAccessToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

router.post('/users', async (req, res) => {
    const { email } = req.body;
    try {
        if(await User.findOne({ email })) {
                return res.status(400).send({ status: 'O Usurário já existe.' })
        }
        const user = await User.create(req.body);
        user.password = undefined;

        const token = generateAccessToken({ id: user.id });
        return res.status(201).send({status: "Registro efetuado com sucesso!", user, token});
    } catch (e) {
        console.log(e)
        return res.status(500).send({ status: 'Não foi possível efetuar o registro.' })
    }
});


router.get('/login', async (req, res) => {
    console.log(res.token)
    const { email, password } = req.query;
    try {
        const user = await User.findOne({ email }).select('+password');

        if(user) {
            if(await bcryptjs.compare(password, user.password)) {
                user.password = undefined;

                const token = generateAccessToken({ id: user.id });
                return res.send({ status: 200, message: 'Login efetuado com sucesso!', user, token })
            } else {
                return res.send({ status: 400, message: 'Senha incorreta' })
            }
        } else {
            return res.send({ status: 404, message: 'Não existe nenhum usuário com esse E-mail.' });
        }
    } catch (e) {
        return res.send({ status: 500, message: 'Não foi possível efetuar o Login.' })
    }
});

router.get('/login/:token', async (req, res) => {
    try {
        let userId;
        const token = req.params.token;
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) return res.send({ status: 401 });
            userId = decoded.id;
        });
        const user = await User.findOne({ _id: userId });
        if(!user)
            return res.send({ status: 404 })

        return res.send({ status: 200, user })
    } catch (e) {
        console.log(e);
        return res.send({ status: 500, message: 'Não foi possível efetuar o Login.' })
    }
});



module.exports = app => app.use('/auth', router);