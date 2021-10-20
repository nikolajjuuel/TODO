const express = require("express");
const router = express.Router();
const axios = require("axios");
const taskHelper = require("../helpers/task");

module.exports = (db) => {
  router.post("/", (req, res) => {
    //checking to make sure someone is logged in
    if (req.session.user_id === undefined) {
      return res.status(400).send("Need to login first");
    }
    const id = req.session.user_id;
    const text = req.body.text.trim();
    if (!text) {
      return res.redirect("/");
    }

    const wolfApi = process.env.WOLFAPIKEY;
    const encode = encodeURIComponent(text);
    const url = `https://api.wolframalpha.com/v2/query?input=${encode}&output=JSON&appid=${wolfApi}`;

    axios
      .get(url)
      .then(function(response) {
        const answer = response.data;
        const answerInformation = answer.queryresult;
        const answeredCategory = answer.queryresult.datatypes;
        const plainTextInfo = answerInformation.pods[1].subpods[0].plaintext;
        const answerImg = answerInformation.pods[2].subpods[0].img.src;
        const category = taskHelper.categorizeMe(answeredCategory);
         //Added to database
        db.query(
          `
   INSERT INTO tasks (user_id, title, category, task_img_url, task_text_info)
   VALUES ($1, $2, $3, $4, $5);
   `,
          [id, text, category, answerImg, plainTextInfo]
        )
          .then((data) => {
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function(error) {
        console.log(error.message);
      });
  });
  return router;
};
