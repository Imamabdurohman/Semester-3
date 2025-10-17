import Pengguna from './User.js';

const newUser = new Pengguna('Imam', 'mamzx@mail.com');

console.log(`Informasi Pengguna: ${newUser.getInfo()}`);