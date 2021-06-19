const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const queryText = `
    SELECT "genres".name, "movies".title FROM "movies_genres"
    JOIN "genres" on "movies_genres".genre_id = "genres".id
    JOIN "movies" on "movies_genres".movie_id = "movies".id
    WHERE "movies".id = $1
  ;
  `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`We had a problem processing your error... ${error}`);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  // Get our queryText ready
  const queryText = `
    SELECT * FROM "genres";
  `;
  // Time for a dive...
  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log(`We had a problem processing your Genre List... ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
