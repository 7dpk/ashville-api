"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    let pass = req.body.password;
    if (!pass) {
        res.status(401).send({ error: "Password is required" });
        return;
    }
    if (pass !== process.env.PASS) {
        res.status(403).send({ error: "Wrong Password!!" });
        return;
    }
    next();
};
exports.auth = auth;
