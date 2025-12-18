const express = require("express");
const app = express();

// Logging middleware
const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next(); // lanjut ke proses berikutnya
};

app.use(logger); // aktifkan middleware

app.get("/service", (req, res) => {
    res.send("Halo! Ini contoh logging middleware.");
});

app.get("/users", (req, res) => {
    res.send("Daftar Users");
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});