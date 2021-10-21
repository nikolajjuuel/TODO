const express = require("express");
const router = express.Router();
const axios = require("axios");
const taskHelper = require("../helpers/task");
const descriptionImage = require("../helpers/descriptionFinder")

module.exports = (db) => {
  router.post("/", (req, res) => {
    //making sure someone is logged in
    if (req.session.user_id === undefined) {
      return res.status(400).send("Need to login first");
    }

    const id = req.session.user_id;
    const text = req.body.text.trim();

    if (!text) {
      return res.redirect("/");
    }

    const serpstackApi = process.env.SEPRSTACKKEY
    const wolfApi = process.env.WOLFAPIKEY;
    const encode = encodeURIComponent(text);
    const urlWolf = `https://api.wolframalpha.com/v2/query?input=${encode}&output=JSON&appid=${wolfApi}`;
    const urlSerp = `https://serpapi.com/search.json?engine=google&q=${encode}&google_domain=google.com&tbm=isch&ijn=0&api_key=${serpstackApi}`;

    axios.get(urlWolf).then(function (response) {
      const answer = response.data;
      const answerInformation = answer.queryresult;
      const answeredCategory = answer.queryresult.datatypes;
      //finds description image using helper function descriptionFinder
      const infoImage = descriptionImage.descriptionFinder(answerInformation);
      axios
        .get(urlSerp)
        .then((resp) => {
          //selects first image from serp api
          let answerImg = resp.data.images_results[0].original;
          const category = taskHelper.categorizeMe(answeredCategory);
          db.query(
            `
             INSERT INTO tasks 
             (user_id, title, category, task_img_url, task_text_info)
             VALUES ($1, $2, $3, $4, $5);
            `,
            [id, text, category, answerImg, infoImage]
          )
            .then(() => {
              res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  });

  return router;
};
