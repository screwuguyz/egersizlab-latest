# GitHub Desktop Conflict Fix Script
Write-Host "=== GitHub Desktop Conflict Düzeltme ===" -ForegroundColor Cyan

# 1. Git durumunu kontrol et
Write-Host "`n1. Git durumu kontrol ediliyor..." -ForegroundColor Yellow
git status

# 2. Tüm merge/rebase state'lerini temizle
Write-Host "`n2. Merge/Rebase state temizleniyor..." -ForegroundColor Yellow
Remove-Item -Path .git/MERGE_HEAD -ErrorAction SilentlyContinue
Remove-Item -Path .git/MERGE_MODE -ErrorAction SilentlyContinue
Remove-Item -Path .git/MERGE_MSG -ErrorAction SilentlyContinue
Remove-Item -Path .git/CHERRY_PICK_HEAD -ErrorAction SilentlyContinue
Remove-Item -Path .git/REBASE_HEAD -ErrorAction SilentlyContinue
Remove-Item -Path .git/REBASE_APPLY -ErrorAction SilentlyContinue
Write-Host "   ✓ Merge state temizlendi" -ForegroundColor Green

# 3. Git index'i yeniden oluştur
Write-Host "`n3. Git index yeniden oluşturuluyor..." -ForegroundColor Yellow
Remove-Item -Path .git/index.lock -ErrorAction SilentlyContinue
git reset HEAD
git add .
Write-Host "   ✓ Index yenilendi" -ForegroundColor Green

# 4. GitHub Desktop cache'ini temizle
Write-Host "`n4. GitHub Desktop cache temizleniyor..." -ForegroundColor Yellow
$desktopCache = "$env:LOCALAPPDATA\GitHubDesktop"
$repoCache = "$env:APPDATA\GitHub Desktop"
if (Test-Path $desktopCache) {
    Write-Host "   GitHub Desktop cache bulundu: $desktopCache" -ForegroundColor Gray
}
if (Test-Path $repoCache) {
    Write-Host "   GitHub Desktop repo cache bulundu: $repoCache" -ForegroundColor Gray
}
Write-Host "   ⚠ GitHub Desktop'u kapatıp açmanız gerekiyor" -ForegroundColor Yellow

# 5. Final durum
Write-Host "`n5. Final durum kontrol ediliyor..." -ForegroundColor Yellow
git status --short
Write-Host "`n✓ Tüm işlemler tamamlandı!" -ForegroundColor Green
Write-Host "`nŞimdi yapmanız gerekenler:" -ForegroundColor Cyan
Write-Host "1. GitHub Desktop'u tamamen kapatın" -ForegroundColor White
Write-Host "2. GitHub Desktop'u tekrar açın" -ForegroundColor White
Write-Host "3. Repository'yi yeniden açın veya Refresh yapın" -ForegroundColor White

