const express = require("express");
const app = express();

// middleware
app.use(express.json());

// ROUTE ROOT (INI YANG KAMU BELUM PUNYA)
app.get("/", (req, res) => {
  res.send("Server jalan");
});

// routes
const authRoutes = require("./routes/authroutes");
const activityRoutes = require("./routes/activityroutes");

app.use(authRoutes);
app.use(activityRoutes);

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
