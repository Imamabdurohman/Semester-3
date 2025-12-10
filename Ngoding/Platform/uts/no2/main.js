import { hitungRataRata, kategoriNilai } from './nilai.js';

const mahasiswa = [
    { nama: "Andi", nilai: 90 },
    { nama: "Budi", nilai: 75 },
    { nama: "Citra", nilai: 60 },
    { nama: "Dinda", nilai: 40 }
];
console.log("=== Data Nilai Mahasiswa ===");

for (const m of mahasiswa) {
    const kategori = kategoriNilai(m.nilai);
    console.log(`${m.nama} - Nilai: ${m.nilai} - Kategori: ${kategori}`);
}

const semuaNilai = mahasiswa.map(m => m.nilai);
const rataRata = hitungRataRata(semuaNilai);
console.log(`Rata-rata Kelas = ${rataRata}`);