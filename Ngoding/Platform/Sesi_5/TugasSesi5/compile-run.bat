@echo off
echo ====================================================
echo Kompilasi dan Menjalankan Sistem Pengolah Dokumen
echo ====================================================

echo Membersihkan folder out...
rmdir /s /q out 2>nul
mkdir out

echo Mengompilasi semua modul...
javac -d out --module-source-path src ^
    src/doc.core/module-info.java src/doc.core/doc/core/*.java ^
    src/doc.text/module-info.java src/doc.text/doc/text/*.java ^
    src/doc.html/module-info.java src/doc.html/doc/html/*.java ^
    src/doc.app/module-info.java src/doc.app/doc/app/*.java

if %errorlevel% neq 0 (
    echo Terjadi kesalahan saat kompilasi!
    pause
    exit /b
)

echo Kompilasi berhasil!

echo Menjalankan program...
java --module-path out -m doc.app/doc.app.MainApp

pause
