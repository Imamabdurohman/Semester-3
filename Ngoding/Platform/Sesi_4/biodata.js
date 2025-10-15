const userProfile = {
    firsname : "Budi",
    lastName : "Santoso",
    age : 30,
    email : "Budi.santoso@example.com",
    isActive : true,
    getFullName : function() {
        return this.firsname + " " + this.lastName;
    },
    greet() {
        return "Halo, saya " + this.getFullName() + "."
    },
    up() {
        return "Hobi saya adalah Memancing"
    },
};

const data = {
    "nama lengkap": "Siti Aisyah",
    "no-telepon": "0812345678"
};

const properti = "usia";
console.log(userProfile[properti]);

console.log("Nama Lengkap:", userProfile.getFullName());
console.log("Usia:", userProfile.age);
console.log("Status Aktif:", userProfile['isActive']);
console.log(userProfile.greet());
console.log(userProfile.up());
console.log(data["nama lengkap"]); // Output: Siti Aisyah