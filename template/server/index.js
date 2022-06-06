const express = require("express");
const mongoose = require("mongoose");

const app = express();
const templateRouter = require("./routes/template");
const api = require("./middleware/api");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/template", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(api);
app.use(templateRouter);

app.use("/", (req, res, next) => {
  res.send("hello express");
});

app.listen(8080, () => {
  console.log("server is running on http://localhost:8080");
});
