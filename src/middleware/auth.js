const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")?.at(1);
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Access denied",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({
      status: 401,
      message: "Invalid token",
    });
  }
}

module.exports = verifyToken;
