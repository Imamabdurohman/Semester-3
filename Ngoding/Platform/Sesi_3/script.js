// Menunggu hingga seluruh konten HTML siap sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // 1. DATA SISWA (tetap sama)
    const dataSiswa = [
        { nama: 'Asep', tugas: 80, uts: 95, uas: 85 },
        { nama: 'Iwan', tugas: 75, uts: 75, uas: 90 },
        { nama: 'Cepi', tugas: 70, uts: 80, uas: 90 },
        { nama: 'Agus', tugas: 65, uts: 40, uas: 55 },
        { nama: 'Dadang', tugas: 60, uts: 70, uas: 60 }
    ];

    // 2. FUNGSI UNTUK MENGHITUNG NILAI AKHIR (tetap sama)
    function hitungNilaiAkhir(tugas, uts, uas) {
        const nilai = (tugas * 0.30) + (uts * 0.30) + (uas * 0.40);
        return nilai; // Kembalikan nilai mentah untuk pengecekan kondisi
    }

    // 3. PROSES UNTUK MENAMPILKAN DATA KE TABEL
    const tabelBody = document.getElementById('student-data-body');
    
    dataSiswa.forEach((siswa, index) => {
        const nilaiAkhir = hitungNilaiAkhir(siswa.tugas, siswa.uts, siswa.uas);
        
        // ---- INI BAGIAN BARU ----
        // Menentukan kelas CSS berdasarkan nilai akhir
        let gradeClass = '';
        if (nilaiAkhir >= 75) {
            gradeClass = 'grade-pass'; // Lulus
        } else if (nilaiAkhir >= 55) {
            gradeClass = 'grade-average'; // Cukup
        } else {
            gradeClass = 'grade-fail'; // Gagal
        }
        // ---- AKHIR BAGIAN BARU ----

        // Buat baris tabel baru (<tr>)
        const baris = document.createElement('tr');

        // Isi konten HTML untuk baris tersebut, tambahkan kelas ke <td> terakhir
        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${siswa.nama}</td>
            <td>${siswa.tugas}</td>
            <td>${siswa.uts}</td>
            <td>${siswa.uas}</td>
            <td><span class="${gradeClass}">${nilaiAkhir.toFixed(1)}</span></td>
        `;

        // Tambahkan baris yang sudah diisi ke dalam body tabel
        tabelBody.appendChild(baris);
    });

});