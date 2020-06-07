"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const routes_1 = __importDefault(require("./app/routes"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
class App {
    constructor() {
        this.express = express_1.default();
        this.database();
        this.middlewares();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
        this.express.use(helmet_1.default());
        this.express.use('/api', routes_1.default);
    }
    async database() {
        try {
            await mongoose_1.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log('MongoDb connect');
        }
        catch (error) {
            console.log('error ao conectar com mongodb');
            console.error(error.message);
            process.exit(1);
        }
    }
}
exports.default = new App().express;
