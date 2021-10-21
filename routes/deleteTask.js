const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    const id = req.params.id;
    console.log('task-ID', req.params)
    db.query(`DELETE FROM tasks
             WHERE id = ${id}`);
    res.redirect("/");
  });
  return router;
};
