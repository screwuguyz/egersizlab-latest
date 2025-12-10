# MongoDB Verilerini Görüntüleme - Hızlı Başlangıç

## ✅ En Kolay Yöntem: Batch Dosyası

**`view-users.bat`** dosyasına çift tıklayın! 

Bu dosya:
- MongoDB'ye bağlanır
- Tüm kullanıcıları listeler
- Dashboard verilerini gösterir
- Sonuçları ekranda gösterir

## 📋 Diğer Yöntemler

### 1. MongoDB Compass (Görsel Arayüz - Önerilen)

1. **İndir:** https://www.mongodb.com/try/download/compass
2. **Bağlan:** `mongodb://localhost:27017`
3. **Aç:** `egersizlab` → `users` koleksiyonu

### 2. Komut Satırı (mongosh)

Terminal'de:
```bash
mongosh mongodb://localhost:27017/egersizlab
```

Sonra:
```javascript
// Tüm kullanıcıları listele
db.users.find().pretty()

// Sadece dashboard verileri olan kullanıcılar
db.users.find({ "dashboardData": { $exists: true } }).pretty()

// Belirli bir kullanıcı
db.users.findOne({ email: "ornek@email.com" })
```

### 3. Node.js Script

Terminal'de (server klasöründe):
```bash
node view-users-simple.js
```

## 📊 Dashboard Verilerinde Neler Var?

- **photos**: Yüklenen fotoğraflar (front, side, back)
- **formData**: Form bilgileri (cinsiyet, yaş, boy, kilo, vb.)
- **assessmentResults**: Analiz sonuçları
- **notifications**: Bildirimler
- **exercisePrograms**: Egzersiz programları
- **progressData**: İlerleme verileri

## 🔍 Hızlı Komutlar

```javascript
// Kullanıcı sayısı
db.users.countDocuments()

// Dashboard verileri olan kullanıcı sayısı
db.users.countDocuments({ "dashboardData.photos": { $exists: true } })

// Fotoğraf yükleyen kullanıcılar
db.users.find({ "dashboardData.photos": { $exists: true } }).pretty()
```

