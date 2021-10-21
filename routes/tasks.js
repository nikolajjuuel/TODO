const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //selects user specific tasks from database
    let query = `
    SELECT * FROM tasks
    WHERE user_id = ${req.session.user_id}
    ORDER BY id DESC;
    `;
    db.query(query)
      .then(data => {
        const tasks = data.rows;
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
