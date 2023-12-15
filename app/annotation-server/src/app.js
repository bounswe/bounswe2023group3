const express = require("express");
const app = express();
const port = process.env.port || 1453;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
