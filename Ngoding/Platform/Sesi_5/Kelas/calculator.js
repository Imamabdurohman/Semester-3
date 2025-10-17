function sanitizeInput(value) {
    if (typeof value !== 'number') {
        throw new Error('Input harus berupa angka.');
    
    }
    return value;

}

export function hitungDiskon(harga, prsenDiskon) {
    try {
        const h = sanitizeInput(harga);
        const p = sanitizeInput(prsenDiskon);
        return h - (h * (p / 100));
    } catch (e) {
        console.error('Terjadi kesalahan:', e.message);
        return null;
    }
}

export function hitungPajak(harga, prsenPajak) {
    const h = sanitizeInput(harga);
    const p = sanitizeInput(prsenPajak);
    return h + (h * p / 100);
}