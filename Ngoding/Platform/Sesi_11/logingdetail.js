const express = require("express");
const app = express();

// Logging middleware lengkap
const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - IP: ${req.ip}`);
    });

    next();
};

app.use(logger);

app.get("/", (req, res) => {
    res.send("Middleware logging lengkap siap digunakan!");
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
