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
const textRoutes = require("./routes/text");
const deleteRoutes = require("./routes/deleteTask");
const editRoutes = require("./routes/editTask");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/tasks", tasksRoutes(db));
app.use("/text", textRoutes(db));
app.use("/delete", deleteRoutes(db));
app.use("/edit", editRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

///////////////////////////////////////////////////////////////
/////CATEGORIZE ME FUNCTION////////////////////////////////

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




































app.get("/login", (req, res) => {
  req.session = null;
  res.render("login");
});






app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
