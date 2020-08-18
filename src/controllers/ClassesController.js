const express = require('express');
const Class = require('../models/class');
const convertHoursToMinutes = require('../utils/convertTime');

const router = express.Router();

router.get('/data', async (req, res) => {
    const {week_day, subject, time} = req.query;
    try {
        let classesData = await Class.find();
        if(week_day) {
            classesData = classesData.filter(classItem => {
                return classItem.schedules.some(schedule => JSON.parse(week_day) === schedule.week_day);
            })
        }
        if(subject) {
            classesData = classesData.filter(classItem => {
                return classItem.subject === subject;
            })
        }
        if(time) {
            classesData = classesData.filter(classItem => {
                return classItem.schedules.some(schedule => {
                    if(week_day) {
                        if(schedule.week_day === JSON.parse(week_day)) {
                            return convertHoursToMinutes(time) >= schedule.from && convertHoursToMinutes(time) < schedule.to;
                        } else {
                            return false;
                        }
                    }
                    return convertHoursToMinutes(time) >= schedule.from && convertHoursToMinutes(time) < schedule.to;
                });
            })    
        }

        return res.status(200).send({ status: 'As suas incormações foram buscadas com sucesso!', classesData })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ status: 'Não foi possível buscar suas informações.' })
    }
});

router.post('/register', async (req, res) => {
    try {
        const classesData = await Class.create(req.body);

        return res.status(200).send({ status: 'As suas incormações foram buscadas com sucesso!', classesData })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ status: 'Não foi possível buscar suas informações.' })
    }
});

module.exports = app => app.use('/classes', router);
