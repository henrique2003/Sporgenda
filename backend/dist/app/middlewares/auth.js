"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
    const authHeaders = req.header('Authorization');
    if (!authHeaders) {
        return res.status(401).json('Invalid token');
    }
    try {
        const decoded = jsonwebtoken_1.verify(authHeaders, 'sporgenda123');
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json('Invalid token');
    }
};
