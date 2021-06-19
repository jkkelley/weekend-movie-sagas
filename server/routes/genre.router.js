const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/:id", (req, res) => {
  console.log(req.params.id)
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
    });
});

module.exports = router;
