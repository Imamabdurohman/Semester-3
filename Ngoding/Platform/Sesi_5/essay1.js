const siswa1 = { nama: "Ardi", nilai: 85};
const siswa2 = { nama: "Beni", nilai: 70};
const siswa3 = { nama: "Cita", nilai: 92};
const siswa4 = { nama: "Dodi", nilai: 78};

const dataSemuaKelas = [
    [siswa1, siswa2],
    [siswa3, siswa4]
];

const nilaiMinimuLulus = 80;
let siswaYangLulus = [];

for (let i = 0; i < dataSemuaKelas.length; i++) {
    const kelas = dataSemuaKelas[i];
    for (let j = 0; j < dataSemuaKelas[i].length; j++) {
        const siswa = kelas[j];
        if (siswa.nilai >= nilaiMinimuLulus) {
            siswaYangLulus.push(siswa.nama);
        }
    }
}

console.log(`Daftar siswa yang lulus (nilai >= ${nilaiMinimuLulus}):`);
console.log(siswaYangLulus);