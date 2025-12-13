@echo off
echo ========================================
echo   GITHUB DESKTOP CONFLICT FIX
echo ========================================
echo.

echo 1. Git state temizleniyor...
if exist .git\MERGE_HEAD del /F /Q .git\MERGE_HEAD >nul 2>&1
if exist .git\MERGE_MODE del /F /Q .git\MERGE_MODE >nul 2>&1
if exist .git\MERGE_MSG del /F /Q .git\MERGE_MSG >nul 2>&1
if exist .git\index.lock del /F /Q .git\index.lock >nul 2>&1
echo    Git state temizlendi!
echo.

echo 2. Git durumu kontrol ediliyor...
git status
echo.

echo 3. GitHub Desktop process kontrol ediliyor...
tasklist /FI "IMAGENAME eq GitHubDesktop.exe" 2>NUL | find /I /N "GitHubDesktop.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    GitHub Desktop calisiyor!
    echo    LUTFEN GITHUB DESKTOP'U KAPATIN!
    echo    Sonra bu script'i tekrar calistirin.
    pause
    exit /b
) else (
    echo    GitHub Desktop kapali.
)
echo.

echo 4. Final durum:
git status --short
echo.

echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo Simdi yapmaniz gerekenler:
echo 1. GitHub Desktop'u acin
echo 2. Repository'yi Refresh yapin (F5)
echo 3. Eger hala conflict goruyorsaniz:
echo    - "Abort merge" butonuna tiklayin
echo    - Sonra "Pull origin" yapin
echo.
pause

