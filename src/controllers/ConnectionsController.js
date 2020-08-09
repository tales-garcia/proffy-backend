import db from '../database/connection';

export default class ConnectionsController {
    // async create(req, res) {
    //     const { user_id } = req.body;

    //     await db('connections').insert({
    //         user_id
    //     });

    //     return res.status(201).send();
    // }

    async index(req, res) {
        // const totalConnections = await db('connections').count('* as total');

        // res.status(200).json(totalConnections[0]);
    }
}