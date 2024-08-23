const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "my_jwt_secret";
console.log(JWT_SECRET);
const expiresIn = "1m";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // 'Authorization': 'Bearer <token>'
  // ['Bearer', '<token>'][1] -> '<token>'
  // 'Authorization': '<token>'

  if (!token) {
    res.status(403).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = {
  auth,
  JWT_SECRET,
  expiresIn,
};