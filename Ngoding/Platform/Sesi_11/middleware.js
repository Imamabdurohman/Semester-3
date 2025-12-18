const express = require("express");
const app = express();

// Application-level middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // lanjut ke middleware berikutnya atau route
});

app.get("/", (req, res) => {
    res.send("Hello dari server dengan middleware!");
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});