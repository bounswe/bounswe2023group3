const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("./utils/db_connect");
const swaggerDocs = require("./utils/swagger");
const annotationRouter = require("./routes/annotation.route");

const express = require("express");

const port = process.env.port || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Annotation Server!");
});

app.use("/", router);

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await connect();

  swaggerDocs(app, port);
});
