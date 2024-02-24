const { spawn } = require("child_process");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const { filterArray } = require("./functions/filter");
const { addInteractions } = require("./functions/interactions");
const { getUrl } = require("./functions/getUrl");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    "valid-endpoints": [
      { GET: "/api/getURL" },
      { POST: "/api/getInteractions" },
    ],
  });
});

const child = spawn(process.env.INTERACTSH);
child.on("error", (error) => {
  console.log(`error: ${error.message}`);
});
child.on("close", (code) => {
  console.log(`process is closed with code: ${code}`);
});

let url = "";
child.stderr.on("data", (data) => {
  const res = data.toString();
  url = getUrl(res);
});
app.get("/api/getURL", (req, res) => {
  res.json({ url });
});

const interactions = [];
child.stdout.on("data", (data) => {
  let res = data.toString();
  const interact = addInteractions(res);
  for (let i = 0; i < interact.length; i++) interactions.push(interact[i]);
});

app.post("/api/getInteractions", (req, res) => {
  const result = filterArray(interactions, req.body);
  res.json(result);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Application is running on port: ${port}`);
});
