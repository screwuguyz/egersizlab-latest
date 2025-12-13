@echo off
echo MongoDB kullanicilari goruntuleniyor...
echo.
cd /d "%~dp0"
node view-users-simple.cjs
pause

