// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

//cookieSession 
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(function (req, res, next) {
  res.locals.user = req.session.userName;
  return next();
});

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// 'dev' = Concise output colored by response status for development use.
app.use(morgan("dev"));

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//ejs middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//SASS middleware
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

//node express
app.use(express.static("public"));

// Separated Routes for each Resource
const login = require("./routes/login");
const logout = require("./routes/logout");
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");
const textRoutes = require("./routes/text");
const deleteRoutes = require("./routes/deleteTask");
const editRoutes = require("./routes/editTask");
const editImportant = require("./routes/important");

// Mount all resource routes
app.use("/login",login(db));
app.use("/logout",logout(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/tasks", tasksRoutes(db));
app.use("/text", textRoutes(db));
app.use("/delete", deleteRoutes(db));
app.use("/edit", editRoutes(db));
app.use("/important", editImportant(db));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
