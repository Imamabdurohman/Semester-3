const express = require("express");
const router = express.Router();

// REGISTER
router.post("/register", (req, res) => {
  res.json({ message: "Register berhasil" });
});

// LOGIN
router.post("/login", (req, res) => {
  res.json({ message: "Login berhasil" });
});

module.exports = router;
