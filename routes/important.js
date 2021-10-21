const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    console.log('CONNECTED TO THE EDIT ROUTE')
    console.log("BODY",req.body);
    const id = req.params.id; //task
    const important = req.body.important;

   console.log('task-ID', req.params)
    db.query(`UPDATE tasks
              SET important = $1
             WHERE id = $2`,
             [important, id]);
    res.redirect("/");
  });
  return router;
};
