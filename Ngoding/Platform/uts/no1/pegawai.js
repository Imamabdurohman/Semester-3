export function hitungGajiBersih(gajiPokok, potongan) {
    return gajiPokok - potongan;
}

export function kategoriJabatan(gajiPokok) {
    if (gajiPokok > 10000000) {
    return "Manajer";
    } else if (gajiPokok >= 5000000) {
    return "Supervisor";
    } else {
    return "Staf";
    }
}