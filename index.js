import express from "express";
import * as data from "./sample-data.js";

const app = express();

app.get("/bars", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const bar = data.bars;

  res.json({
    rows: bar.slice(offset, offset + limit),
    count: bar.length,
  });
})

app.get("/bars/:barId", async (req, res) => {
  const barId = +req.params.barId;
  const bar = data.bars.find(
    (bar) => bar.id === barId
  );
  if (!bar) {
    res.status(404).send("not found");
    return;
  }
  res.json(bar);
})

app.get("/bars/:barId/reviews", async (req, res) => {
  const barId = +req.params.barId;
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;
  const bar = data.bars.find(
    (bar) => bar.id === barId
  );
  if (!bar) {
    res.status(404).send("not found");
    return;
  }

  const reviews = data.reviews.filter(
    (review) => barId === review.barId
  );

  res.json({
    count: reviews.length,
    rows: reviews.slice(offset, offset + limit),
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});