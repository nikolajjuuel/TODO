const express = require("express");
const router = express.Router();
var axios = require("axios");
var convert = require("xml-js");
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
    //////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////
    // let config = {
    //   method: "get",
    //   url: `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(
    //     text
    //   )}&appid=${process.env.WOLFAPIKEY}`,
    // };
    //console.log("2222222", process.env.WOLFAPIKEY);

    const url = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(
      text
    )}&appid=${process.env.WOLFAPIKEY}`
    axios.get(url)
      .then(function (response) {
        console.log("============================");
        let answer = convert.xml2js(response.data);
        console.log("##################################");
        let answeredCategory = answer.elements[0].attributes.datatypes;
        console.log("ANSWER", answeredCategory);
        let category = taskHelper.categorizeMe(answeredCategory);
        //Added to database
        db.query(
          `
   INSERT INTO tasks (user_id, title, category)
   VALUES ($1, $2, $3);
   `,
          [id, text, category]
        )
          .then((data) => {
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return router;
};
