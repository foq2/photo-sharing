const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
require("dotenv").config();

dbConnect();

app.use(cors());
app.use("/images", express.static("images"));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
