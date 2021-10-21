const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    const id = req.params.id;
    //update important BOOLEAN value in database from pin icon
    const important = req.body.important;
    db.query(`UPDATE tasks
              SET important = $1
             WHERE id = $2`,
      [important, id]);
    res.redirect("/");
  });
  return router;
};
