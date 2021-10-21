const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    const id = req.params.id;
    //new selected category from drop down category buttons
    const category = req.body.category;
    db.query(`UPDATE tasks
              SET category = $1
             WHERE id = $2`,
      [category, id]);
    res.redirect("/");
  });
  return router;
};
