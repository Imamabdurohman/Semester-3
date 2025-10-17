import { hitungDiskon, hitungPajak } from './calculator.js';

const hargaAwal = 6000;

const hargaSetelahDiskon = hitungDiskon(hargaAwal, 10);
const hargaAkhir = hitungPajak(hargaSetelahDiskon, 5);

console.log(`Harga Setelah Diskon 10%: ${hargaSetelahDiskon}`);
console.log(`Harga Setelah Pajak 5%: ${hargaAkhir}`);

hitungDiskon('seribu', 10);