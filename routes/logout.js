const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();

module.exports = (db) => {
    router.get("/", (req, res) => {
        req.session = null;
        res.redirect("/");
    });
    return router;
};
