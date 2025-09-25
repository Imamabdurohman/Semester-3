const prompt = require('prompt-sync')();

// Minta input nilai dari pengguna
let matematika = parseFloat(prompt("Masukkan nilai Matematika: "));
let bahasaInggris = parseFloat(prompt("Masukkan nilai Bahasa Inggris: "));
let ipa = parseFloat(prompt("Masukkan nilai IPA: "));

// Hitung rata-rata
let nilaiRataRata = (matematika + bahasaInggris + ipa) / 3;

console.log("Nilai Rata-Rata:", nilaiRataRata);

// Tentukan status kelulusan
if (nilaiRataRata >= 80) {
console.log("Status Kelulusan: Lulus");
} else {
console.log("Status Kelulusan: Tidak Lulus");
}
