const express = require('express');
const UserData = require('../models/userData');
const auth = require('../middlewares/authentication');

const router = express.Router();
router.use(auth);

router.get('/data', async (req, res) => {
    try {
        const userData = await UserData.findOne({ userId: req.userId });

        if(!userData) {
            return res.status(404).send({ status: 'Não foi possível buscar suas informações.' })
        }

        return res.status(200).send({ status: 'As suas incormações foram buscadas com sucesso!', userData })
    } catch (e) {
        return res.status(500).send({ status: 'Não foi possível buscar suas informações.' })
    }
});

module.exports = app => app.use('/user', router);
