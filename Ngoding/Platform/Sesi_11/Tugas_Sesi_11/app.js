const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();
const SECRET_KEY = "kunci_rahasia_mahasiswa";

app.use(express.json());

// --- DATABASE DUMMY ---
let users = [];
let activities = [
    { id: 1, name: "LDKM 2024", date: "2024-12-30", location: "Gedung Serbaguna" }
];

// --- 3. IMPLEMENTASI MIDDLEWARE ---

// A. Request Logger Middleware
const requestLogger = (req, res, next) => {
    const log = `[${new Date().toLocaleString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync('access.log', log); 
    console.log(log);
    next();
};
app.use(requestLogger);

// B. Auth Middleware (Cek JWT)
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token tidak ditemukan!" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Token tidak valid atau kedaluwarsa" });
    }
};

// C. Role Middleware (Cek Hak Akses)
const roleMiddleware = (roleRequired) => {
    return (req, res, next) => {
        if (req.user.role !== roleRequired) {
            return res.status(403).json({ message: `Forbidden: Khusus ${roleRequired}` });
        }
        next();
    };
};

// D. Activity Validation Middleware (Input Admin)
const validateActivity = (req, res, next) => {
    const { name, date, location } = req.body;
    if (!name || !date || !location) {
        return res.status(400).json({ message: "Data kegiatan (nama, tgl, lokasi) tidak lengkap!" });
    }
    next();
};

// --- 4. IMPLEMENTASI ENDPOINT (AUTHENTICATION) ---

app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, role });
    res.status(201).json({ message: "Registrasi Berhasil" });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: "Username atau Password salah" });
});

// --- ENDPOINT KEGIATAN ---

// GET /activities (Semua bisa melihat)
app.get('/activities', authMiddleware, (req, res) => {
    res.json(activities);
});

// POST /activities (Admin Only)
app.post('/activities', authMiddleware, roleMiddleware('admin'), validateActivity, (req, res) => {
    const newActivity = { id: activities.length + 1, ...req.body };
    activities.push(newActivity);
    res.status(201).json({ message: "Kegiatan berhasil dibuat", data: newActivity });
});

// PUT /activities/:id (Admin Only)
app.put('/activities/:id', authMiddleware, roleMiddleware('admin'), validateActivity, (req, res) => {
    const index = activities.findIndex(a => a.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
    activities[index] = { id: parseInt(req.params.id), ...req.body };
    res.json({ message: "Kegiatan berhasil diupdate" });
});

// POST /activities/:id/join (Mahasiswa Only)
app.post('/activities/:id/join', authMiddleware, roleMiddleware('mahasiswa'), (req, res) => {
    const activity = activities.find(a => a.id == req.params.id);
    if (!activity) return res.status(404).json({ message: "Kegiatan tidak tersedia" });
    res.json({ message: `Berhasil! Mahasiswa ${req.user.username} telah terdaftar di ${activity.name}` });
});

app.listen(3000, () => console.log("Server aktif di http://localhost:3000"));