const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
require("dotenv").config();
const Auth = require("./route/auths");
const Photo = require("./route/photo");
const User = require("./route/user");
const Comment = require("./route/comment");
dbConnect();

app.use(cors());
app.use("/static/images", express.static("static"));
app.use(express.json());

app.use("/api/auth", Auth);
app.use("/api/photo", Photo);
app.use("/api/user", User);
app.use("/api/comment", Comment);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
