const { spawn } = require("child_process");
const express = require("express");
const bodyParser = require("body-parser");
const { error } = require("console");
require("dotenv").config();

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
child.on("error", (e) => {
  console.log(`error: ${error.message}`);
});
child.on("close", (code) => {
  console.log(`process is closed with code: ${code}`);
});

let url = "";
child.stderr.on("data", (data) => {
  const res = data.toString();
  if (res.includes("oast")) {
    let u = res.split(" ");
    url = u[u.length - 1];
    url = url.slice(0, -1);
  }
});
app.get("/api/getURL", (req, res) => {
  res.json({ url });
});

const interactions = [];
child.stdout.on("data", (data) => {
  let res = data.toString();
  console.log(res);
  const log = res.split("\n");

  const interact = {};
  log.forEach((line) => {
    const match = line.match(
      /\[.*\] Received (.*) from .* at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/
    );
    if (match) {
      const event = match[0];
      const time = match[2];
      interact[time] = event;
      interactions.push(interact);
    }
  });
});

const filterArray = (interactions, ...time) => {
  if (time[0].start && time[0].end) {
    const res = [];
    for (let i = 0; i < interactions.length; i++) {
      const timestamp = Object.keys(interactions[i])[0];
      if (timestamp >= time[0].start && timestamp <= time[0].end)
        res.push(interactions[i]);
    }
    return res;
  }
  return interactions;
};

app.post("/api/getInteractions", (req, res) => {
  const result = filterArray(interactions, req.body);
  res.json(result);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Application is running on port: ${port}`);
});
