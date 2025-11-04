def cari_kombinasi_koin(jumlah_uang, daftar_koin):
    try:
        koin_int = [int(k) for k in daftar_koin]
        koin_int.sort(reverse=True)
    except ValueError:
        print("Error: Pastikan semua nilai koin adalah angka.")
        return None, 0
    
    kombinasi_digunakan = {}
    total_koin = 0
    sisa_uang = int(jumlah_uang)
    
    print(f"\n--- Memproses Uang Sejumlah: {sisa_uang} ---")
    
    for koin in koin_int:
        if sisa_uang >= koin:
            jumlah_keping = sisa_uang // koin
            sisa_uang = sisa_uang % koin
            kombinasi_digunakan[koin] = jumlah_keping
            total_koin += jumlah_keping
            print(f"-> Ambil Koin {koin}: {jumlah_keping} keping (Sisa uang: {sisa_uang})")

    if sisa_uang > 0:
        print(f"\nPERINGATAN: Tidak dapat memecah pas. Sisa uang: {sisa_uang}")
        
    return kombinasi_digunakan, total_koin

if __name__ == "__main__":
    try:
        amount_str = input("1. Masukkan jumlah uang: ")
        amount = int(amount_str)

        koin_input_str = input("2. Masukkan daftar koin: ")
        
        list_koin_bersih = koin_input_str.replace(',', ' ').split()
        
        list_koin = [k for k in list_koin_bersih if k.strip()]

        if not list_koin:
            print("\nError: Anda tidak memasukkan daftar koin.")
        else:
            kombinasi, total = cari_kombinasi_koin(amount, list_koin)
            if kombinasi is not None:
                print("\n--- HASIL AKHIR ---")
                
                print("\nKombinasi koin yang digunakan:")
                if not kombinasi:
                    print("Tidak ada koin yang digunakan.")
                else:
                    for koin, jumlah in kombinasi.items():
                        print(f"* {jumlah} keping koin {koin}")
                        
                print("\nJumlah total koin:")
                print(f"{total} keping")

    except ValueError:
        print("\nError: Input jumlah uang harus berupa angka yang valid (integer).")
    except Exception as e:
        print(f"\nTerjadi error yang tidak terduga: {e}")