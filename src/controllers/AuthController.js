const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const UserData = require('../models/userData');

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

        await UserData.create({
            userId: user.id
        });

        const token = generateAccessToken({ id: user.id });
        return res.status(201).send({status: "Registro efetuado com sucesso!", user, token});
    } catch (e) {
        console.log(e)
        return res.status(500).send({ status: 'Não foi possível efetuar o registro.' })
    }
});


router.get('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');

        if(user) {
            if(await bcryptjs.compare(password, user.password)) {
                user.password = undefined;

                const token = generateAccessToken({ id: user.id });
                return res.status(200).send({ status: 'Login efetuado com sucesso!', user, token })
            } else {
                return res.status(400).send({ status: 'Senha incorreta' })
            }
        } else {
            return res.status(404).send({ status: 'Não existe nenhum usuário com esse E-mail.' });
        }
    } catch (e) {
        return res.status(500).send({ status: 'Não foi possível efetuar o Login.' })
    }
});



module.exports = app => app.use('/auth', router);