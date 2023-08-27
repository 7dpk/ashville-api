"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new mongodb_1.MongoClient((_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : '', {
    monitorCommands: true
});
client.connect().then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
});
let db = client.db('ashville').collection('points');
exports.default = db;
