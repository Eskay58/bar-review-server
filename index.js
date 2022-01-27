import express from "express";
import * as data from "./sample-data.js";

const app = express();

app.get("/bar", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const bar = data.restaurants;

  res.json({
    rows: bar.slice(offset, offset + limit),
    count: bar.length,
  });

})