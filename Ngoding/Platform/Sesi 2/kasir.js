// Impor modul 'readline' bawaan Node.js untuk menangani input dari terminal
const readline = require('readline');

// Buat interface untuk membaca input dan menampilkan output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array untuk menyimpan daftar harga barang yang diinput
const daftarHarga = [];

/**
 * Fungsi utama untuk menghitung total, menerapkan diskon, dan menampilkan hasil.
 */
function hitungTotalDanDiskon() {
  console.log("\n--- Menghitung Total ---");

  // Jika tidak ada barang yang diinput, hentikan proses.
  if (daftarHarga.length === 0) {
    console.log("Tidak ada barang yang diinput.");
    return;
  }

  // Jumlahkan semua harga dalam array menggunakan reduce
  const totalBelanja = daftarHarga.reduce((total, harga) => total + harga, 0);

  let hargaAkhir = totalBelanja;
  let diskonPersen = 0;

  // Terapkan aturan diskon
  if (totalBelanja > 1000000) {
    diskonPersen = 15;
    hargaAkhir = totalBelanja - (totalBelanja * 0.15);
  } else if (totalBelanja > 500000) {
    diskonPersen = 10;
    hargaAkhir = totalBelanja - (totalBelanja * 0.10);
  }

  // Format angka ke format Rupiah untuk tampilan yang lebih rapi
  const formatRupiah = (angka) => `Rp${angka.toLocaleString('id-ID')}`;

  console.log(`Total Harga Asli      : ${formatRupiah(totalBelanja)}`);

  if (diskonPersen > 0) {
    console.log(`Selamat! Anda mendapat diskon sebesar ${diskonPersen}%.`);
    console.log(`Harga Akhir Setelah Diskon: ${formatRupiah(hargaAkhir)}`);
  } else {
    console.log("Belanja Anda tidak memenuhi syarat untuk mendapatkan diskon.");
    console.log(`Harga yang Harus Dibayar  : ${formatRupiah(hargaAkhir)}`);
  }
}

/**
 * Fungsi untuk meminta input harga barang kepada pengguna secara berulang.
 */
function tanyaHarga() {
  rl.question("Masukkan harga barang (atau ketik 'selesai' untuk menghitung): ", (input) => {
    // Jika pengguna mengetik 'selesai', hentikan bertanya dan hitung totalnya
    if (input.toLowerCase() === 'selesai') {
      hitungTotalDanDiskon();
      rl.close(); // Tutup interface readline
      return;
    }

    // Ubah input menjadi angka
    const harga = parseFloat(input);

    // Validasi input: pastikan yang dimasukkan adalah angka yang valid
    if (!isNaN(harga) && harga > 0) {
      daftarHarga.push(harga);
      console.log(`-> Barang dengan harga Rp${harga.toLocaleString('id-ID')} ditambahkan.`);
    } else {
      console.log("Input tidak valid. Harap masukkan angka yang benar.");
    }

    // Panggil kembali fungsi ini untuk menanyakan harga barang berikutnya
    tanyaHarga();
  });
}

// --- Mulai Program ---
console.log("Selamat datang di sistem kasir!");
console.log("Silakan masukkan harga setiap barang satu per satu.");
tanyaHarga(); // Panggil fungsi untuk pertama kali