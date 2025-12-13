# MongoDB Verilerini Görüntüleme Rehberi

## Yöntem 1: MongoDB Compass (Önerilen - Görsel Arayüz)

### Adımlar:
1. **MongoDB Compass İndir:**
   - https://www.mongodb.com/try/download/compass adresinden indirin
   - Windows için `.msi` dosyasını indirip kurun

2. **Bağlantı:**
   - Compass'ı açın
   - Connection String: `mongodb://localhost:27017`
   - "Connect" butonuna tıklayın

3. **Verileri Görüntüle:**
   - Sol taraftan `egersizlab` veritabanını seçin
   - `users` koleksiyonuna tıklayın
   - Kullanıcıların listesini göreceksiniz
   - Herhangi bir kullanıcıya tıklayarak detaylarını görebilirsiniz
   - `dashboardData` alanında tüm kullanıcı verileri var

## Yöntem 2: MongoDB Shell (mongosh) - Komut Satırı

### Adımlar:
1. **MongoDB Shell'i açın:**
   ```bash
   mongosh mongodb://localhost:27017/egersizlab
   ```

2. **Tüm kullanıcıları listeleyin:**
   ```javascript
   db.users.find().pretty()
   ```

3. **Belirli bir kullanıcıyı bulun (email ile):**
   ```javascript
   db.users.findOne({ email: "kullanici@email.com" })
   ```

4. **Sadece dashboard verilerini görüntüleyin:**
   ```javascript
   db.users.find({}, { name: 1, email: 1, dashboardData: 1 }).pretty()
   ```

5. **Dashboard verileri olan kullanıcıları bulun:**
   ```javascript
   db.users.find({ "dashboardData.assessmentResults": { $exists: true } }).pretty()
   ```

6. **Fotoğrafları olan kullanıcıları bulun:**
   ```javascript
   db.users.find({ "dashboardData.photos": { $exists: true } }).pretty()
   ```

## Yöntem 3: Node.js Script (Programatik)

`view-users.js` dosyasını çalıştırarak tüm kullanıcıları görüntüleyebilirsiniz.

## Hızlı Komutlar:

### Tüm kullanıcıları listele:
```javascript
db.users.find().pretty()
```

### Kullanıcı sayısı:
```javascript
db.users.countDocuments()
```

### Dashboard verileri olan kullanıcı sayısı:
```javascript
db.users.countDocuments({ "dashboardData.assessmentResults": { $exists: true } })
```

### Belirli bir kullanıcının dashboard verilerini görüntüle:
```javascript
db.users.findOne(
  { email: "ornek@email.com" },
  { dashboardData: 1, name: 1, email: 1 }
)
```

## Önemli Notlar:

- Local MongoDB kullanıyorsunuz: `mongodb://localhost:27017`
- Veritabanı adı: `egersizlab`
- Koleksiyon adı: `users`
- `dashboardData` alanında şunlar saklanıyor:
  - `assessmentResults`: Analiz sonuçları
  - `photos`: Yüklenen fotoğraflar
  - `formData`: Form bilgileri
  - `notifications`: Bildirimler
  - `exercisePrograms`: Egzersiz programları
  - `progressData`: İlerleme verileri

