// express
const express = require("express");
const app = express();
const { request, response } = require("express");
// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// mongodb
const MongoClient = require("mongodb").MongoClient;
var db;
// method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// ejs
app.set("views engine", "ejs");
// env
require("dotenv").config();
// public folder
app.use("/public", express.static("public"));
MongoClient.connect(process.env.DB_URL, (error, result) => {
  if (error) return console.log(error);
  db = result.db("indexDo");
  app.listen(process.env.PORT, () => {
    console.log("To Do go");
  });
});
// main
app.get("/", (request, response) => {
  response.render("sign.ejs");
});
// signUp
app.post("/signup", (request, response) => {
  var user = { id: request.body.Username, pw: request.body.Password };
  db.collection("login").insertOne(user, (error, result) => {
    response.redirect("/");
  });
});
// signIn
app.get("/signin", (request, response) => {
  db.collection("do")
    .find()
    .toArray((error, result) => {
      response.render("index.ejs", { doList: result });
    });
});

// write
app.get("/write", (request, response) => {
  response.render("write.ejs");
});

app.post("/doWrite", (request, response) => {
  db.collection("count").findOne({ name: "contentTotal" }, (error, result) => {
    var count = result.count;
    db.collection("do").insertOne(
      {
        _id: count + 1,
        start: request.body.start,
        do: request.body.Do,
        end: request.body.end,
      },
      (error, result) => {
        db.collection("count").updateOne(
          { name: "contentTotal" },
          { $inc: { count: 1 } },
          (error, result) => {
            response.redirect("/signin");
          }
        );
      }
    );
  });
});

// delete
app.delete("/delete", (request, response) => {
  request.body._id = parseInt(request.body._id);
  db.collection("do").deleteOne({ _id: request.body._id }, (error, result) => {
    if (error) return error;
  });
});

app.get("/edit/:id", (request, response) => {
  db.collection("do").findOne(
    { _id: parseInt(request.params.id) },
    (error, result) => {
      response.render("edit.ejs",{doList:result});
    }
  );
});

// update
app.put("/update", (request, response) => {
  db.collection("do").updateOne(
    { _id: parseInt(request.body.id) },
    {
      $set: {
        do: request.body.Do,
        start: request.body.start,
        end: request.body.end,
      },
    },
    (error, result) => {
      if (error) return error;
      response.redirect('/signin')
    }
  );
});
