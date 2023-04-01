const express = require("express");
var bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();
const port = 4000;
app.set("views engine", "ejs");
app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get("/", (req, res) => {
  fetch('https://api.adviceslip.com/advice')
    .then((res) => res.json())
    .then((data) => res.render("index.ejs",{data:data.slip.advice}));
});
app.get("/park", (req, res) => {
  fetch(
    "https://bigdata.gwangju.go.kr/gjAPI/getCityPark/getCityParklist.rd?apiSrvCd=0030&pageNo=1&numOfRow=673"
  )
    .then((res) => res.json())
    .then((data) => res.render("park.ejs", { data: data.response.body.items }));
});


app.listen(port, () => {
  console.log("Start!");
});
