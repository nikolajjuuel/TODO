const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    req.session = null;
    res.render("login");
  });

  router.get("/:id", (req, res) => {
      req.session.user_id = req.params.id;
      db.query(
        `SELECT * FROM users
          WHERE id = $1`,
        [req.params.id]
      )
        .then((data) => {
          console.log("data", data);
          req.session.userName = data.rows[0].name;
          // res.send(users);
          res.redirect("/");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
  });
  return router;
};
