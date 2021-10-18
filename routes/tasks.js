/*
 * All routes for tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log(req.session.user_id);
    let query = `
    SELECT * FROM tasks
    WHERE user_id = ${req.session.user_id}

    `;
    //WHERE user id = session user id
    console.log(query);
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
  router.post("/text", (req,res) => {
    console.log(req.session.user_id)
    // if(req.session.user_id === undefined){
    //   return res.status(400).send('Need to login first')
    // }

     let id = req.session.user_id
     let text = req.body.text.text;
     console.log('ID', id)
     console.log('text', text)
     let category = 'to watch';
     let query = `INSERT INTO tasks (title, category)
                  VALUES ($1, $2)
                  WHERE user_id = $3;`;
     db.query(query,[text, category, id])
     .then((res) => {console.log('RESULT',res.rows);
     res.render('index')
   })
     .catch((err) => {console.log(err)})

   })
  return router;
};


