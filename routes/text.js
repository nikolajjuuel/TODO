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

    axios.get(url).then(function (response) {
      const answer = response.data;
      const answerInformation = answer.queryresult;
      const answeredCategory = answer.queryresult.datatypes;
      const plainTextInfo = answerInformation.pods[1].subpods[0].plaintext;
      console.log('SEARCH INFO', plainTextInfo)
      //const answerImg = answerInformation.pods[2].subpods[0].img.src;
      axios
        .get(
          `https://serpapi.com/search.json?engine=google&q=${encode}&google_domain=google.com&tbm=isch&ijn=0&api_key=53d313b64629e7fcbbfaebc79b87ec0a24cf8c245e839fe561dc461d5c5df23d`
        )
        .then((resp) => {
          const answer = resp;
          console.log("IMG RESPONSE", resp.data.images_results[0].original);
          let answerImg = resp.data.images_results[0].original;

          const podsArray = answerInformation.pods[2].subpods;

          //console.log(answerInformation)
          const category = taskHelper.categorizeMe(answeredCategory);
          //Added to database
          // const formatMe = (text) => {
          //   const x = text.split("\n");
          //   console.log('TEXT IS',)
          //   const ans = text[0] + '\n' + text[1];

          //   return ans;
          // };
          // console.log(formatMe(plainTextInfo), "THIS IS IT");

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
        .catch(function (error) {
          console.log(error.message);
        });
    });
  });

  return router;
};
