"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const validators_1 = require("./validators");
const auth_1 = require("./auth");
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
// setup dotenv
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use('/img/', express_1.default.static('markers'));
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await db.insertOne({world: 'overworld', point: [23, 43]})
    res.send({ message: 'Server is running' });
}));
// create point
app.post('/point', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let data = (_a = req.body) !== null && _a !== void 0 ? _a : {};
    let { error } = validators_1.pointValidator.validate(data);
    delete data.password;
    if (error) {
        res.status(400).send({ error: error.message });
        return;
    }
    try {
        yield db_1.default.insertOne(data);
        res.status(200).send({ message: "Successfully created point" });
    }
    catch (err) {
        res.status(500).send({ error: "Failed to create point" });
    }
}));
// get all points
app.get('/allpoints', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let points = yield db_1.default.find({}).toArray();
    res.status(200).send(points);
}));
// get one point
app.get('/point/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = new mongodb_1.ObjectId(req.params.id);
    let point = yield db_1.default.findOne({ _id: id });
    res.status(200).send(point);
}));
// update point
app.put('/point/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let data = req.body;
    let { error } = validators_1.pointValidator.validate(data);
    if (error) {
        res.status(400).send({ message: error.message });
        return;
    }
    try {
        yield db_1.default.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data });
        res.status(200).send({ message: "Successfully updated point" });
    }
    catch (err) {
        res.status(500).send({ message: "Failed to update point" });
    }
}));
// delete point
app.delete('/point/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield db_1.default.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        res.status(200).send({ message: "Successfully deleted point" });
    }
    catch (err) {
        res.status(500).send({ message: "Failed to delete point" });
    }
}));
// return the names of all the markers from ../markers/ folder
app.get('/markers', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fs = require('fs');
    const path = require('path');
    const directoryPath = path.join(__dirname, '../markers');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        res.status(200).send(files);
    });
}));
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
