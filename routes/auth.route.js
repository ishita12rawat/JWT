const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, expiresIn, auth } = require("../middelware/auth");

const router = Router();

const username = "username";
const password = "password";

router.post("/login", (req, res) => {
  const { username: user, password: pass } = req.body;

  if (user === username && pass === password) {
    const token = jwt.sign({ username: user }, JWT_SECRET, { expiresIn });

    return res.status(200).json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

router.get("/protected", auth, (req, res) => {
  res.status(200).json({ message: "You shall pass!" });
});

module.exports = router;