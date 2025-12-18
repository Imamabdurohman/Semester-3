const express = require("express");
const app = express();

app.use(express.json());

// Middleware untuk membersihkan input
const sanitizeInput = (req, res, next) => {
    function clean(value) {
        if (typeof value === "string") {
            return value
                .replace(/<script.?>.?<\/script>/gi, "") // hapus <script>
                .replace(/<.*?>/g, "")                    // hapus HTML tag
                .replace(/['"]/g, "")                     // hapus kutip
                .replace(`/(--|\|;|\/\)/g, ""`);         /// hapus karakter SQL injection
        }
        return value;
    }


    if (req.body) {
        for (let key in req.body) {
            req.body[key] = clean(req.body[key]);
        }
    }

    next();
};

// Route GET /
app.get("/", (req, res) => {
    res.send("Server berjalan! Gunakan POST /submit untuk mengirim data.");
});

// Route POST /submit
app.post("/submit", sanitizeInput, (req, res) => {
    res.json({
        message: "Data aman diterima",
        data: req.body
    });
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));