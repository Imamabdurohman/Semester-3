import { hitungGajiBersih, kategoriJabatan } from './pegawai.js';

const pegawai = [
    { nama: "Andi", gajiPokok: 12000000, potongan: 1000000 },
    { nama: "Budi", gajiPokok: 8000000, potongan: 500000 },
    { nama: "Citra", gajiPokok: 4000000, potongan: 200000 }
];

console.log("=== Data Pegawai ===");

for (const p of pegawai) {
    const jabatan = kategoriJabatan(p.gajiPokok);
    const gajiBersih = hitungGajiBersih(p.gajiPokok, p.potongan);

    console.log(`${p.nama} - ${jabatan} - Gaji Bersih: ${gajiBersih}`);
}