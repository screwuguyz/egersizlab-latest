@echo off
echo Kullanicilarin fotograflari HTML dosyasina export ediliyor...
echo.
cd /d "%~dp0"
node view-photos.cjs
echo.
echo HTML dosyasi olusturuldu: users-photos.html
echo Bu dosyayi tarayicida acarak fotograflari gorebilirsiniz.
pause

