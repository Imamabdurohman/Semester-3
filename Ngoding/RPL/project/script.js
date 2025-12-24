// --- 1. DATA & INITIALIZATION ---
const defaultData = {
    users: [
        { id: 1, username: 'admin', password: 'admin', role: 'admin', fullname: 'Admin Utama' },
        { id: 2, username: 'budi', password: '123', role: 'anggota', fullname: 'Budi Santoso' }
    ],
    categories: [
        { id: 1, name: 'Fiksi' }, { id: 2, name: 'Sains' }, { id: 3, name: 'Sejarah' }
    ],
    books: [
        { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', catId: 1, stock: 5 },
        { id: 2, title: 'Fisika Dasar', author: 'Halliday', catId: 2, stock: 3 }
    ],
    loans: [],
    config: { finePerDay: 2000 }
};

// Load Database
let db = JSON.parse(localStorage.getItem('perpusData')) || defaultData;

// Load Sesi User
let currentUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
let isRegisterMode = false;

function saveData() {
    localStorage.setItem('perpusData', JSON.stringify(db));
}

// --- 2. LOGIKA ROUTING & SECURITY ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const pageName = path.split("/").pop(); 

    // A. Logika untuk Halaman Admin
    if (pageName === 'admin.html') {
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Akses ditolak! Silakan login sebagai Admin.');
            window.location.href = 'index.html'; 
        } else {
            initAdmin(); 
        }
    } 
    // B. Logika untuk Halaman Member
    else if (pageName === 'member.html') {
        if (!currentUser || currentUser.role !== 'anggota') {
            alert('Silakan login terlebih dahulu.');
            window.location.href = 'index.html'; 
        } else {
            initMember(); 
        }
    }
    // C. Logika untuk Halaman Login (Index)
    else if (pageName === 'index.html' || pageName === '') {
        if (currentUser) {
            if (currentUser.role === 'admin') window.location.href = 'admin.html';
            else window.location.href = 'member.html';
        }
    }
});

// --- 3. AUTENTIKASI (LOGIN & REGISTER) ---
function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    document.getElementById('authTitle').innerText = isRegisterMode ? 'Registrasi Anggota' : 'Login Perpustakaan';
    document.getElementById('authBtn').innerText = isRegisterMode ? 'Daftar' : 'Login';
    document.getElementById('fullname').classList.toggle('hidden');
    document.getElementById('toggleText').innerText = isRegisterMode ? 'Sudah punya akun?' : 'Belum punya akun?';
}

function handleAuth() {
    const userInp = document.getElementById('username').value;
    const passInp = document.getElementById('password').value;
    const nameInp = document.getElementById('fullname').value;

    if (isRegisterMode) {
        // REGISTER
        if(db.users.find(u => u.username === userInp)) return alert('Username sudah dipakai!');
        if(!userInp || !passInp || !nameInp) return alert('Mohon isi semua data');
        
        db.users.push({ id: Date.now(), username: userInp, password: passInp, role: 'anggota', fullname: nameInp });
        saveData();
        alert('Registrasi berhasil! Silakan login.');
        toggleAuthMode();
    } else {
        // LOGIN
        const account = db.users.find(u => u.username === userInp && u.password === passInp);
        if (account) {
            localStorage.setItem('loggedInUser', JSON.stringify(account));
            if (account.role === 'admin') window.location.href = 'admin.html';
            else window.location.href = 'member.html';
        } else {
            alert('Username atau Password salah!');
        }
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

// --- 4. LOGIKA UI HELPER ---
function setActiveMenu(element) {
    const parent = element.parentElement;
    Array.from(parent.children).forEach(child => child.classList.remove('active'));
    element.classList.add('active');
}

function showSection(id, element) {
    // Admin Tabs
    document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(element) setActiveMenu(element);
}

function showMemberSection(id, element) {
    // Member Tabs
    document.querySelectorAll('.mem-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(element) setActiveMenu(element);
}

// --- 5. LOGIKA ADMIN (CRUD LENGKAP) ---
function initAdmin() {
    renderBooks();
    renderCategories();
    renderLoans();
    renderMembers();
    document.getElementById('fineRate').value = db.config.finePerDay;
    updateCategoryDropdown();
}

function updateCategoryDropdown() {
    const select = document.getElementById('bookCategory');
    if(!select) return; 
    select.innerHTML = '<option value="">Pilih Kategori</option>';
    db.categories.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });
}

// --- A. MANAJEMEN BUKU ---
function saveBook() {
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const catId = document.getElementById('bookCategory').value;
    const stock = document.getElementById('bookStock').value;

    if(!title || !stock) return alert('Judul dan Stok wajib diisi');

    if (id) {
        const book = db.books.find(b => b.id == id);
        book.title = title; book.author = author; book.catId = catId; book.stock = parseInt(stock);
    } else {
        db.books.push({ id: Date.now(), title, author, catId, stock: parseInt(stock) });
    }
    saveData();
    renderBooks();
    
    // Reset Form
    document.getElementById('bookId').value = '';
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookStock').value = '';
}

function editBook(id) {
    const book = db.books.find(b => b.id == id);
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookCategory').value = book.catId;
    document.getElementById('bookStock').value = book.stock;
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteBook(id) {
    const isBorrowed = db.loans.find(l => l.bookId == id && l.status === 'Dipinjam');
    if (isBorrowed) {
        alert("Gagal! Buku ini sedang dipinjam user.");
        return;
    }
    if (confirm("Yakin ingin menghapus buku ini?")) {
        db.books = db.books.filter(b => b.id != id);
        saveData();
        renderBooks();
    }
}

function renderBooks() {
    const tbody = document.getElementById('bookTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    db.books.forEach(b => {
        const catName = db.categories.find(c => c.id == b.catId)?.name || '-';
        tbody.innerHTML += `
            <tr>
                <td>${b.id}</td>
                <td>${b.title}</td>
                <td>${b.author}</td>
                <td>${catName}</td>
                <td>${b.stock}</td>
                <td>
                    <button class="btn-success btn-small" onclick="editBook(${b.id})">Edit</button>
                    <button class="btn-danger btn-small" style="margin-left:5px" onclick="deleteBook(${b.id})">Hapus</button>
                </td>
            </tr>`;
    });
}

// --- B. KATEGORI & CONFIG ---
function addCategory() {
    const name = document.getElementById('catName').value;
    if(name) {
        db.categories.push({ id: Date.now(), name });
        saveData(); renderCategories(); updateCategoryDropdown();
        document.getElementById('catName').value = '';
    }
}

function renderCategories() {
    const tbody = document.getElementById('catTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    db.categories.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>
                    <button class="btn-danger btn-small" onclick="deleteCategory(${c.id})">Hapus</button>
                </td>
            </tr>`;
    });
}

function deleteCategory(id) {
    const isUsed = db.books.find(b => b.catId == id);
    if (isUsed) {
        alert(`Gagal! Kategori ini masih dipakai oleh buku "${isUsed.title}".`);
        return;
    }
    if (confirm("Hapus kategori ini?")) {
        db.categories = db.categories.filter(c => c.id != id);
        saveData();
        renderCategories();
        updateCategoryDropdown();
    }
}

function saveConfig() {
    db.config.finePerDay = document.getElementById('fineRate').value;
    saveData();
    alert('Pengaturan disimpan');
}

// --- C. MANAJEMEN ANGGOTA ---
function renderMembers() {
    const tbody = document.getElementById('memberTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    db.users.filter(u => u.role === 'anggota').forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.username}</td>
                <td>${u.fullname}</td>
                <td>
                    <button class="btn-danger btn-small" onclick="deleteMember(${u.id})">Hapus</button>
                </td>
            </tr>`;
    });
}

function deleteMember(id) {
    const hasLoan = db.loans.find(l => l.userId == id && l.status === 'Dipinjam');
    if (hasLoan) {
        alert("Gagal! Anggota ini masih meminjam buku.");
        return;
    }
    if (confirm("Yakin ingin menghapus anggota ini?")) {
        db.users = db.users.filter(u => u.id != id);
        saveData();
        renderMembers();
    }
}

// --- D. MANAJEMEN TRANSAKSI ---
function renderLoans() {
    const tbody = document.getElementById('loanTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    const sortedLoans = [...db.loans].sort((a, b) => b.id - a.id);

    sortedLoans.forEach(l => {
        const user = db.users.find(u => u.id == l.userId)?.fullname || 'User Dihapus';
        const book = db.books.find(b => b.id == l.bookId)?.title || 'Buku Dihapus';
        let actionBtn = '';
        
        if (l.status === 'Dipinjam') {
            actionBtn = `<button class="btn-success btn-small" onclick="processReturn(${l.id})">Kembalikan</button>`;
        } else {
            actionBtn = `<button class="btn-danger btn-small" onclick="deleteLoan(${l.id})">Hapus</button>`;
        }

        tbody.innerHTML += `
            <tr>
                <td>${user}</td>
                <td>${book}</td>
                <td>${l.datePinjam}</td>
                <td>${l.dateRencana}</td>
                <td><span class="status-badge ${l.status === 'Dipinjam' ? 'bg-blue' : 'bg-green'}">${l.status}</span></td>
                <td>Rp ${l.denda}</td>
                <td>${actionBtn}</td>
            </tr>`;
    });
}

function processReturn(loanId) {
    const loan = db.loans.find(l => l.id == loanId);
    const today = new Date().toISOString().split('T')[0];
    
    const date1 = new Date(loan.dateRencana);
    const date2 = new Date(today);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    let denda = 0;
    if (diffDays > 0) denda = diffDays * db.config.finePerDay;
    
    if(confirm(`Terlambat: ${Math.max(0, diffDays)} hari. Denda: Rp ${denda}. Kembalikan?`)) {
        loan.status = 'Dikembalikan';
        loan.dateKembali = today;
        loan.denda = denda;
        
        const book = db.books.find(b => b.id == loan.bookId);
        if(book) book.stock++;
        
        saveData();
        renderLoans();
    }
}

function deleteLoan(id) {
    if (confirm("Hapus riwayat ini?")) {
        db.loans = db.loans.filter(l => l.id != id);
        saveData();
        renderLoans();
    }
}

// --- 6. LOGIKA ANGGOTA (MEMBER) ---
function initMember() {
    renderMemberBooks();
    renderMyHistory();
}

function renderMemberBooks() {
    const searchEl = document.getElementById('searchBook');
    const keyword = searchEl ? searchEl.value.toLowerCase() : '';
    const tbody = document.getElementById('memBookTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    db.books.forEach(b => {
        if (b.title.toLowerCase().includes(keyword) || b.author.toLowerCase().includes(keyword)) {
            const catName = db.categories.find(c => c.id == b.catId)?.name || '-';
            tbody.innerHTML += `
                <tr>
                    <td>${b.title}</td>
                    <td>${b.author}</td>
                    <td>${catName}</td>
                    <td>${b.stock}</td>
                    <td>
                        ${b.stock > 0 ? `<button class="btn-success btn-small" onclick="borrowBook(${b.id})">Pinjam</button>` : '<span style="color:red; font-size:12px">Habis</span>'}
                    </td>
                </tr>`;
        }
    });
}

function borrowBook(bookId) {
    if(!currentUser) return window.location.href = 'index.html';

    const days = prompt("Pinjam berapa hari?", "3");
    if (days && !isNaN(days)) {
        const book = db.books.find(b => b.id == bookId);
        book.stock--;

        const today = new Date();
        const returnDate = new Date();
        returnDate.setDate(today.getDate() + parseInt(days));

        db.loans.push({
            id: Date.now(),
            userId: currentUser.id,
            bookId: bookId,
            datePinjam: today.toISOString().split('T')[0],
            dateRencana: returnDate.toISOString().split('T')[0],
            dateKembali: null,
            status: 'Dipinjam',
            denda: 0
        });

        saveData();
        renderMemberBooks();
        alert('Berhasil meminjam buku!');
    }
}

// --- UPDATE BAGIAN INI UNTUK MENAMPILKAN JATUH TEMPO ---
function renderMyHistory() {
    const tbody = document.getElementById('myHistoryTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    // Filter dan Urutkan
    const myLoans = db.loans.filter(l => l.userId === currentUser.id);
    myLoans.sort((a, b) => b.id - a.id); // Urutkan dari yang terbaru

    myLoans.forEach(l => {
        const book = db.books.find(b => b.id == l.bookId)?.title || 'Buku dihapus';
        
        // Menambahkan kolom Jatuh Tempo (dateRencana) agar sesuai HTML
        tbody.innerHTML += `
            <tr>
                <td>${book}</td>
                <td>${l.datePinjam}</td>
                <td style="color: #e67e22; font-weight: bold;">${l.dateRencana}</td>
                <td>${l.dateKembali || '-'}</td>
                <td><span class="status-badge ${l.status === 'Dipinjam' ? 'bg-blue' : 'bg-green'}">${l.status}</span></td>
                <td>Rp ${l.denda}</td>
            </tr>`;
    });
}