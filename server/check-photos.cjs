// MongoDB'de fotoğrafları kontrol et ve göster
const mongoose = require('mongoose');
require('dotenv').config();

const checkPhotos = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/egersizlab';
    console.log('🔌 MongoDB\'ye bağlanılıyor...\n');
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();

    console.log(`📊 ${users.length} kullanıcı kontrol ediliyor...\n`);

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name} (${user.email})`);
      
      if (!user.dashboardData) {
        console.log('   ❌ Dashboard verisi yok');
        return;
      }

      // Photos direkt kontrol
      if (user.dashboardData.photos) {
        console.log('   📷 dashboardData.photos:');
        const photos = user.dashboardData.photos;
        
        ['front', 'side', 'back'].forEach(key => {
          if (photos[key]) {
            if (typeof photos[key] === 'string' && photos[key].startsWith('data:image')) {
              console.log(`      ✅ ${key}: Base64 verisi VAR (${Math.round(photos[key].length / 1024)} KB)`);
            } else if (photos[key].exists) {
              console.log(`      ⚠️  ${key}: Sadece metadata (exists: true, size: ${photos[key].size || 'N/A'} bytes)`);
            } else {
              console.log(`      ❌ ${key}: Veri yok`);
            }
          }
        });
      }

      // AssessmentResults içinde photos kontrol
      if (user.dashboardData.assessmentResults && user.dashboardData.assessmentResults.photos) {
        console.log('   📷 assessmentResults.photos:');
        const arPhotos = user.dashboardData.assessmentResults.photos;
        
        ['front', 'side', 'back'].forEach(key => {
          if (arPhotos[key]) {
            if (typeof arPhotos[key] === 'string' && arPhotos[key].startsWith('data:image')) {
              console.log(`      ✅ ${key}: Base64 verisi VAR (${Math.round(arPhotos[key].length / 1024)} KB)`);
            } else {
              console.log(`      ⚠️  ${key}: Base64 verisi yok`);
            }
          }
        });
      }

      console.log('-'.repeat(80));
    });

    console.log('\n✅ Kontrol tamamlandı.\n');
    console.log('💡 Yeni assessment yapıldığında fotoğraflar base64 olarak kaydedilecek.\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
};

checkPhotos();

