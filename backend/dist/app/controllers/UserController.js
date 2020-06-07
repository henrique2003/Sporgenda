"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../models/User"));
class UserController {
    async post(req, res) {
        try {
            req.body.password = await bcrypt_1.hash(req.body.password, 10);
            const user = await User_1.default.create(req.body);
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json('Server Error');
        }
    }
    async login(req, res) {
        try {
            const { name, password } = req.body;
            const user = await User_1.default.findOne({ name });
            if (!user) {
                return res.status(400).json('Usuário não encontrado');
            }
            if (!await bcrypt_1.compare(password, user.password)) {
                return res.status(400).json('Senha inválida');
            }
            const token = jsonwebtoken_1.sign({ id: user.id }, 'sporgenda123', { expiresIn: 86400 });
            return res.status(200).json({ user, token });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json('Server Error');
        }
    }
    async auth(req, res) {
        try {
            return res.status(204).json();
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json('Server Error');
        }
    }
}
exports.default = new UserController();
