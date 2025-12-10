# Local MongoDB Kurulumu (Kurumsal Ağ İçin)

## Hızlı Kurulum

### 1. MongoDB Community Server İndir
- https://www.mongodb.com/try/download/community
- Windows için MSI installer indir
- Versiyon: 7.0 veya üzeri

### 2. Kurulum
1. İndirilen MSI dosyasını çalıştırın
2. "Complete" kurulum seçeneğini seçin
3. **ÖNEMLİ:** "Install MongoDB as a Service" seçeneğini işaretleyin
4. "Install MongoDB Compass" seçeneğini işaretleyin (opsiyonel - GUI)
5. Kurulumu tamamlayın

### 3. MongoDB Servisini Başlat
Windows Services'ten:
1. Windows + R → `services.msc` → Enter
2. "MongoDB" servisini bulun
3. Sağ tık → "Start" (eğer durmuşsa)

Veya CMD'den (Yönetici olarak):
```cmd
net start MongoDB
```

### 4. .env Dosyasını Güncelle
`server/.env` dosyasını açın ve şunu ekleyin/güncelleyin:

```env
MONGODB_URI=mongodb://localhost:27017/egersizlab
```

### 5. Backend'i Başlat
```cmd
cd C:\Users\ataaf\OneDrive\Desktop\egersizlab-latest\egersizlab-latest\server
npm run dev
```

Başarılı olursa şunu göreceksiniz:
```
✅ MongoDB bağlantısı başarılı
🚀 Server çalışıyor!
📍 Port: 5000
```

## Sorun Giderme

### MongoDB servisi başlamıyorsa:
1. Windows Services'te MongoDB servisini kontrol edin
2. Event Viewer'da hataları kontrol edin
3. MongoDB log dosyalarını kontrol edin: `C:\Program Files\MongoDB\Server\7.0\log\`

### Port 27017 kullanımda hatası:
- Başka bir MongoDB instance çalışıyor olabilir
- Port'u değiştirin veya çalışan instance'ı durdurun

### Kurulum izni yoksa:
- Sistem yöneticisinden yardım isteyin
- Veya portable MongoDB kullanın (kurulum gerektirmez)

