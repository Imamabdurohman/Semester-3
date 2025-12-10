export function hitungRataRata(nilaiArray) {
    if (nilaiArray.length === 0) {
    return 0;
    }
    const total = nilaiArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total / nilaiArray.length;
}

export function kategoriNilai(nilai) {
    if (nilai >= 85) {
    return "A";
    } else if (nilai >= 70) {
    return "B";
    } else if (nilai >= 55) {
    return "C";
    } else {
    return "D";
    }
}