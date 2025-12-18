const express = require("express");
const app = express();

const workingHoursMiddleware = (req, res, next) => {
    const hour = new Date().getHours();

    if (hour < 8 || hour > 17) {
        return res.status(403).json({
            message: "Akses hanya diperbolehkan pukul 08:00 - 17:00"
        });
    }

    next();
};

app.get("/", workingHoursMiddleware, (req, res) => {
    res.send("Service hanya dapat diakses jam kerja!");
});

app.listen(3000);