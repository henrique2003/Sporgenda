"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = __importDefault(require("../models/Schedule"));
class ScheduleController {
    async index(req, res) {
        try {
            const schedule = await Schedule_1.default.find({});
            return res.status(200).json(schedule);
        }
        catch (error) {
            return res.status(500).json('Server Error');
        }
    }
    async store(req, res) {
        try {
            const { day, month, time, location, title } = req.body;
            const fields = ['day', 'month', 'time', 'location', 'title'];
            for (const field of fields) {
                if (typeof req.body[field] === 'string') {
                    req.body[field] = req.body[field].trim();
                }
            }
            if (!day || !time || !month || !location || !title) {
                return res.status(400).json('Campo em branco');
            }
            if (parseInt(day) < 1 || parseInt(day) > 31) {
                return res.status(400).json('Dia inválido');
            }
            const schedule = await Schedule_1.default.create(req.body);
            return res.status(200).json(schedule);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json('Server Error');
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json('Necessário Id');
            }
            const schedule = await Schedule_1.default.findById(id);
            if (!schedule) {
                return res.status(400).json('Não encontrado');
            }
            return res.status(200).json(schedule);
        }
        catch (error) {
            return res.status(500).json('Server Error');
        }
    }
    async registerPeople(req, res) {
        try {
            const { body, params } = req;
            const { id } = params;
            if (!body.name) {
                return res.status(400).json('Campo em branco');
            }
            const lastSchedule = await Schedule_1.default.findById(id);
            lastSchedule.users.push(body.name);
            const schedule = await Schedule_1.default.findByIdAndUpdate({
                _id: id
            }, {
                $set: lastSchedule
            }, {
                upsert: true
            });
            return res.status(200).json(schedule);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json('Server Error');
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json('Necessário Id');
            }
            await Schedule_1.default.findByIdAndDelete(id);
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json('Server Error');
        }
    }
}
exports.default = new ScheduleController();
