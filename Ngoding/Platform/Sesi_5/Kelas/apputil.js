import { formatRupiah, capitalize } from './utils.js';

const harga = 1500000;
const namaProduk = 'PC Gaming';

console.log(`Harga: ${formatRupiah(harga)}`);
console.log(`Nama Produk: ${capitalize(namaProduk)}`);