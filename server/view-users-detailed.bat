@echo off
echo MongoDB kullanicilari DETAYLI goruntuleniyor...
echo Developer modu - Tum bilgiler gosterilecek
echo.
cd /d "%~dp0"
node view-users-detailed.cjs
pause

