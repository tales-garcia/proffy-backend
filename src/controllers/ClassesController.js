import { Request, Response } from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertTime';

export default class ClassesController {

    async index(req, res) {
        // const { week_day, subject, time } = req.query;

        // console.log(week_day, subject, time)

        // const minutes = convertHoursToMinutes(time as string);
        
        // const classes = await db('classes')
        //     .whereExists(function() {
        //         if(week_day && minutes) {
        //             this.select('classes_schedules.*')
        //                 .from('classes_schedules')
        //                 .whereRaw('`classes_schedules`.`class_id` = `classes`.`id`')
        //                 .whereRaw('`classes_schedules`.`week_day` = ??', [Number(week_day)])
        //                 .whereRaw('`classes_schedules`.`from` <= ??', [minutes])
        //                 .whereRaw('`classes_schedules`.`to` > ??', [minutes]);
        //         } else if(week_day && !minutes) {
        //             this.select('classes_schedules.*')
        //                 .from('classes_schedules')
        //                 .whereRaw('`classes_schedules`.`class_id` = `classes`.`id`')
        //                 .whereRaw('`classes_schedules`.`week_day` = ??', [Number(week_day)])
        //         } else if(minutes && !week_day) {
        //             this.select('classes_schedules.*')
        //                 .from('classes_schedules')
        //                 .whereRaw('`classes_schedules`.`class_id` = `classes`.`id`')
        //                 .whereRaw('`classes_schedules`.`from` <= ??', [minutes])
        //                 .whereRaw('`classes_schedules`.`to` > ??', [minutes]);
        //         } else if(!minutes && !week_day) {
        //             this.select('classes_schedules.*')
        //                 .from('classes_schedules')
        //                 .whereRaw('`classes_schedules`.`class_id` = `classes`.`id`')
        //         }
        //     })
        //     .where("classes.subject", subject ? "=" :">=", subject ? subject as string : '')
        //     .join('users', 'classes.user_id', '=', 'users.id')
        //     .join('classes_schedules', 'classes.id', '=', 'classes_schedules.class_id')
        //     .select([
        //         'classes.*',
        //         'users.*'
        //     ])
        //     .catch(console.log);
            

        // return res.json(classes);
    }

    async create(req, res) {
        // const {
        //     name,
        //     avatar,
        //     whatsapp,
        //     bio,
        //     subject,
        //     cost,
        //     schedules
        // } = req.body;
    
        // const trx = await db.transaction();
    
        // try {
        //     const insertedUsersId = await trx('users').insert({
        //         name,
        //         avatar,
        //         whatsapp,
        //         bio
        //     });
        
        //     const user_id = insertedUsersId[0];
        
        //     const insertedClassesIds = await trx('classes').insert({
        //         subject,
        //         cost,
        //         user_id
        //     });
        
        //     const class_id = insertedClassesIds[0];
        
        //     const schedulesToInsert = schedules.map((scheduleItem : ScheduleItem) => {
        //         return {
        //             week_day: scheduleItem.week_day,
        //             from: convertHoursToMinutes(scheduleItem.from),
        //             to: convertHoursToMinutes(scheduleItem.to),
        //             class_id
        //         }
        //     });
        
        //     await trx('classes_schedules').insert(schedulesToInsert);
        
        //     await trx.commit();
            
        //     return res.status(201).send();
        // } catch(exc) {
        //     await trx.rollback();

        //     console.log(exc)
    
        //     return res.status(400).json({
        //         err: 'Unexpected error while uploading data'
        //     });
        // }
    }
}