/**
 * MongoDB'deki kullanıcıları görüntüleme scripti
 * Kullanım: npx tsx view-users.js
 */

import mongoose from 'mongoose';
import { User } from './src/models/User.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const viewUsers = async () => {
  try {
    // MongoDB'ye bağlan
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI bulunamadı!');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    // Tüm kullanıcıları getir
    const users = await User.find({}).select('name email packageType dashboardData createdAt');

    if (users.length === 0) {
      console.log('📭 Henüz kayıtlı kullanıcı yok.\n');
      await mongoose.connection.close();
      return;
    }

    console.log(`📊 Toplam ${users.length} kullanıcı bulundu:\n`);
    console.log('='.repeat(80));

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. Kullanıcı:`);
      console.log(`   İsim: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Paket: ${user.packageType || 'none'}`);
      console.log(`   Kayıt Tarihi: ${user.createdAt.toLocaleString('tr-TR')}`);

      if (user.dashboardData) {
        console.log(`   📦 Dashboard Verileri:`);
        
        if (user.dashboardData.photos) {
          const photoCount = Object.keys(user.dashboardData.photos).filter(
            key => user.dashboardData.photos[key] !== null
          ).length;
          console.log(`      - Fotoğraflar: ${photoCount} adet`);
        }
        
        if (user.dashboardData.formData) {
          console.log(`      - Form Verileri: Var`);
        }
        
        if (user.dashboardData.assessmentResults) {
          console.log(`      - Assessment Sonuçları: Var`);
        }
        
        if (user.dashboardData.notifications && user.dashboardData.notifications.length > 0) {
          console.log(`      - Bildirimler: ${user.dashboardData.notifications.length} adet`);
        }
      } else {
        console.log(`   📦 Dashboard Verileri: Yok`);
      }

      console.log('-'.repeat(80));
    });

    console.log('\n✅ İşlem tamamlandı.\n');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
};

viewUsers();

