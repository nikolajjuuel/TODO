// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
// Required for API call
var axios = require("axios");
var convert = require("xml-js");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(function (req, res, next) {
  console.log("req session:", req.session.userName);
  res.locals.user = req.session.userName;
  return next();
});

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/tasks", tasksRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

///////////////////////////////////////////////////////////////
/////CATEGORIZE ME FUNCTION////////////////////////////////

const categorizeMe = (text) => {
  if (text.toLowerCase().includes("food")) {
    return "To eat";
  } else if (text.toLowerCase().includes("movie")) {
    return "To watch";
  } else if (text.toLowerCase().includes("book")) {
    return "To read";
  }
  return "Not categorized by wolfram";
};


///////////////////////////////////////////
app.get("/login/:id", (req, res) => {
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

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/text", async (req, res) => {
  //checking to make sure someone is logged in
  if (req.session.user_id === undefined) {
    return res.status(400).send("Need to login first");
  }
  const id = req.session.user_id;
  const text = req.body.text;
  //const category = "To watch";
  //////////////////////////////////////////////////////////
  let config = {
    method: "get",
    url: `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(
      text
    )}&appid=${process.env.WOLFAPIKEY}`,
  };
console.log("2222222", process.env.WOLFAPIKEY)

  axios(config)
    .then(function (response) {
      console.log("============================");
      let answer = convert.xml2js(response.data);
      console.log('answer attributes', answer.elements);
      console.log('answer elements', answer.elements)

      console.log("##################################");
      let answeredCategory = answer.elements[0].attributes.datatypes;

      console.log('answeredCategory',answeredCategory)
      console.log("ANSWER", answeredCategory);
      let category = categorizeMe(answeredCategory)
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

  ///////////////////////////////////////////////////////////
/////////////////////////////////////////////
  //Added to database
  // db.query(
  //   `
  //  INSERT INTO tasks (user_id, title, category)
  //  VALUES ($1, $2, $3);
  //  `,
  //   [id, text, category]
  // )
  //   .then((data) => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  /////////////////////////////////////////////////////////////////
  //const whatToDo = req.body.text;

  // var config = {
  //   method: 'get',
  //   url: `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent("ramen")}&appid=E7VRV7-28KWR98T9A`,

  // };

  // axios(config)
  // .then(function (response) {
  //   console.log('============================')
  //   let answer = convert.xml2js(response.data)
  //   console.log('##################################')
  //   console.log('ANSWER', answer.elements[0].attributes.datatypes)
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  //changing whatToDo so its readable by the openlirary API
  // const whatToRead = whatToDo.trim().split(' ').join('+');

  // axios.get(`http://openlibrary.org/search.json?title=${whatToRead}`)

  // // Promise.all([promise1]).then((values) => {
  // //   console.log(values[0].data.docs);
  // // })
  // .then((res) => {
  //   console.log(res.data.docs)
  //   });

  // res.redirect("/");
});



app.get("/:taskID/delete", (req, res) => {
  const taskID = req.body;
  console.log(db);
  console.log(taskID)
  
 // delete urlDatabase[taskID];

  res.send('delete');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
