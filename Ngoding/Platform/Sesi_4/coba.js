const mobil = {  
	// Key (Kunci) : Value (Nilai)  
	merek: "Toyota",  
	model: "Avanza",  
	tahun: 2022,
    warna: "Putih",  
	// Metode (fungsi sebagai nilai)  
	nyalakan: function() {    
		console.log(
            "Mesin menyala!",
            this.merek,
            this.model,
            this.tahun,
            this.warna,
        );  
	}
};
mobil.nyalakan();


const mobil2 = {
	merek: "Honda",
	tahun: 2020
};

mobil.tahun = 2024;
console.log(mobil2.tahun);

let kunciMerk = "merek";
mobil[kunciMerk] = "Toyota";
console.log(mobil[kunciMerk]);


const buku = {
	judul: "Laskar Pelangi"
};

buku.penulis = "Andrea Hirata";
buku["tahun"] = 2005;
console.log(buku);
/* Output:
{
	judul: "Laskar Pelangi",
	penulis: "Andrea Hirata",
	tahun: 2005
}
*/