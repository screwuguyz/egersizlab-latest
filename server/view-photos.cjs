// Fotoğrafları görüntüleme ve HTML'e export etme scripti
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const viewPhotos = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/egersizlab';
    console.log('🔌 MongoDB\'ye bağlanılıyor...\n');
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();

    if (users.length === 0) {
      console.log('📭 Henüz kayıtlı kullanıcı yok.\n');
      await mongoose.connection.close();
      return;
    }

    console.log(`📊 ${users.length} kullanıcı bulundu, fotoğraflar kontrol ediliyor...\n`);

    let photoCount = 0;
    const htmlContent = [];
    
    htmlContent.push(`
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kullanıcı Fotoğrafları - Developer View</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        .user-section {
            background: white;
            margin: 20px 0;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .user-header {
            border-bottom: 2px solid #10b981;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .user-header h2 {
            color: #1e293b;
            margin: 0;
        }
        .user-info {
            color: #64748b;
            margin: 5px 0;
        }
        .photos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .photo-card {
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 15px;
            background: #f8fafc;
        }
        .photo-card h3 {
            margin: 0 0 10px 0;
            color: #1e293b;
        }
        .photo-card img {
            width: 100%;
            max-width: 500px;
            height: auto;
            border-radius: 8px;
            border: 2px solid #10b981;
        }
        .no-photo {
            color: #94a3b8;
            font-style: italic;
            padding: 20px;
            text-align: center;
        }
        .photo-info {
            margin-top: 10px;
            font-size: 12px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <h1>📷 Kullanıcı Fotoğrafları - Developer View</h1>
    <p>Toplam ${users.length} kullanıcı</p>
`);

    users.forEach((user, index) => {
      // EN GÜNCEL fotoğrafları kontrol et
      let photos = user.dashboardData?.photos;
      
      // Eğer assessmentResults içinde fotoğraflar varsa, onları kullan (daha güncel)
      if (user.dashboardData?.assessmentResults?.photos) {
        photos = user.dashboardData.assessmentResults.photos;
      }
      
      const hasPhotos = photos && 
                       (photos.front || photos.side || photos.back);
      
      if (!hasPhotos) return;

      photoCount++;
      
      htmlContent.push(`
    <div class="user-section">
        <div class="user-header">
            <h2>${index + 1}. ${user.name || 'İsimsiz Kullanıcı'}</h2>
            <div class="user-info">Email: ${user.email || 'N/A'}</div>
            <div class="user-info">Kayıt: ${user.createdAt ? new Date(user.createdAt).toLocaleString('tr-TR') : 'N/A'}</div>
            ${user.dashboardData?.lastAssessmentDate ? `<div class="user-info" style="color: #10b981; font-weight: bold;">📅 Son Assessment: ${new Date(user.dashboardData.lastAssessmentDate).toLocaleString('tr-TR')}</div>` : ''}
            ${user.dashboardData?.assessmentResults?.completedAt ? `<div class="user-info">✅ Assessment Tamamlanma: ${new Date(user.dashboardData.assessmentResults.completedAt).toLocaleString('tr-TR')}</div>` : ''}
        </div>
        <div class="photos-grid">
`);

      // Önden fotoğraf - EN GÜNCEL (assessmentResults öncelikli)
      let frontPhoto = null;
      if (user.dashboardData?.assessmentResults?.photos?.front) {
        frontPhoto = user.dashboardData.assessmentResults.photos.front;
      } else if (photos.front) {
        frontPhoto = photos.front;
      }
      
      if (frontPhoto && typeof frontPhoto === 'string' && frontPhoto.startsWith('data:image')) {
        htmlContent.push(`
            <div class="photo-card">
                <h3>📷 Önden Görünüm</h3>
                <img src="${frontPhoto}" alt="Önden" />
                <div class="photo-info">Boyut: ${Math.round(frontPhoto.length / 1024)} KB</div>
            </div>
`);
      } else if (photos.front && photos.front.exists) {
        htmlContent.push(`
            <div class="photo-card">
                <h3>📷 Önden Görünüm</h3>
                <div class="no-photo">⚠️ Fotoğraf metadata mevcut ama base64 verisi yok<br/>Yeni assessment yapıldığında fotoğraf kaydedilecek</div>
            </div>
`);
      }

      // Yandan fotoğraf - EN GÜNCEL (assessmentResults öncelikli)
      let sidePhoto = null;
      if (user.dashboardData?.assessmentResults?.photos?.side) {
        sidePhoto = user.dashboardData.assessmentResults.photos.side;
      } else if (photos.side) {
        sidePhoto = photos.side;
      }
      
      if (sidePhoto && typeof sidePhoto === 'string' && sidePhoto.startsWith('data:image')) {
        htmlContent.push(`
            <div class="photo-card">
                <h3>📷 Yandan Görünüm</h3>
                <img src="${sidePhoto}" alt="Yandan" />
                <div class="photo-info">Boyut: ${Math.round(sidePhoto.length / 1024)} KB</div>
            </div>
`);
      } else if (photos.side && photos.side.exists) {
        htmlContent.push(`
            <div class="photo-card">
                <h3>📷 Yandan Görünüm</h3>
                <div class="no-photo">⚠️ Fotoğraf metadata mevcut ama base64 verisi yok<br/>Yeni assessment yapıldığında fotoğraf kaydedilecek</div>
            </div>
`);
      }

      // Arkadan fotoğraf - EN GÜNCEL (assessmentResults öncelikli)
      let backPhoto = null;
      if (user.dashboardData?.assessmentResults?.photos?.back) {
        backPhoto = user.dashboardData.assessmentResults.photos.back;
      } else if (photos.back) {
        backPhoto = photos.back;
      }
      
      if (backPhoto && typeof backPhoto === 'string' && backPhoto.startsWith('data:image')) {
        htmlContent.push(`
            <div class="photo-card">
                <h3>📷 Arkadan Görünüm</h3>
                <img src="${backPhoto}" alt="Arkadan" />
                <div class="photo-info">Boyut: ${Math.round(backPhoto.length / 1024)} KB</div>
            </div>
`);
      } else if (photos.back && photos.back.exists) {
        htmlContent.push(`
            <div class="photo-card">
                <h3>📷 Arkadan Görünüm</h3>
                <div class="no-photo">⚠️ Fotoğraf metadata mevcut ama base64 verisi yok<br/>Yeni assessment yapıldığında fotoğraf kaydedilecek</div>
            </div>
`);
      }

      htmlContent.push(`
        </div>
    </div>
`);
    });

    htmlContent.push(`
    <div style="margin-top: 40px; padding: 20px; background: #ecfdf5; border-radius: 10px;">
        <p><strong>Toplam ${photoCount} kullanıcının fotoğrafları gösterildi</strong></p>
        <p style="color: #64748b; font-size: 14px;">Bu sayfayı tarayıcıda açarak fotoğrafları görüntüleyebilirsiniz.</p>
    </div>
</body>
</html>
`);

    // HTML dosyasına kaydet
    const htmlPath = path.join(__dirname, 'users-photos.html');
    fs.writeFileSync(htmlPath, htmlContent.join(''), 'utf8');
    
    console.log(`✅ ${photoCount} kullanıcının fotoğrafları HTML dosyasına kaydedildi!`);
    console.log(`📄 Dosya yolu: ${htmlPath}\n`);
    console.log(`💡 Bu HTML dosyasını tarayıcıda açarak tüm fotoğrafları görebilirsiniz.\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

viewPhotos();

