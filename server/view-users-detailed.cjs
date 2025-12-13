// Detaylı MongoDB görüntüleme scripti - Developer için
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const viewUsersDetailed = async () => {
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

    console.log(`📊 Toplam ${users.length} kullanıcı bulundu:\n`);
    console.log('='.repeat(100));

    const detailedData = [];

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. Kullanıcı:`);
      console.log(`   İsim: ${user.name || 'N/A'}`);
      console.log(`   Email: ${user.email || 'N/A'}`);
      console.log(`   Paket: ${user.packageType || 'none'}`);
      console.log(`   Kayıt Tarihi: ${user.createdAt ? new Date(user.createdAt).toLocaleString('tr-TR') : 'N/A'}`);
      
      // Son assessment tarihi
      if (user.dashboardData && user.dashboardData.lastAssessmentDate) {
        console.log(`   📅 Son Assessment: ${new Date(user.dashboardData.lastAssessmentDate).toLocaleString('tr-TR')}`);
      }

      const userData = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        packageType: user.packageType,
        createdAt: user.createdAt,
        lastAssessmentDate: user.dashboardData?.lastAssessmentDate || null,
        dashboardData: {}
      };

      if (user.dashboardData) {
        console.log(`   📦 Dashboard Verileri:`);
        
        // Fotoğraflar
        if (user.dashboardData.photos) {
          const photos = user.dashboardData.photos;
          const photoCount = Object.keys(photos).filter(key => photos[key] !== null && photos[key] !== undefined).length;
          console.log(`      📷 Fotoğraflar: ${photoCount} adet`);
          userData.dashboardData.photos = photos;
          
          if (photos.front) {
            console.log(`         - Önden: ${photos.front.exists ? 'Var' : 'Yok'} ${photos.front.size ? `(${Math.round(photos.front.size / 1024)} KB)` : ''}`);
          }
          if (photos.side) {
            console.log(`         - Yandan: ${photos.side.exists ? 'Var' : 'Yok'} ${photos.side.size ? `(${Math.round(photos.side.size / 1024)} KB)` : ''}`);
          }
          if (photos.back) {
            console.log(`         - Arkadan: ${photos.back.exists ? 'Var' : 'Yok'} ${photos.back.size ? `(${Math.round(photos.back.size / 1024)} KB)` : ''}`);
          }
        }
        
        // Form Verileri - DETAYLI
        if (user.dashboardData.formData) {
          console.log(`      📝 Form Verileri (Detaylı):`);
          const fd = user.dashboardData.formData;
          userData.dashboardData.formData = fd;
          
          if (fd.gender) {
            const genderText = fd.gender === 'male' ? 'Erkek' : fd.gender === 'female' ? 'Kadın' : fd.gender;
            console.log(`         * Cinsiyet: ${genderText}`);
          }
          if (fd.age) console.log(`         * Yaş: ${fd.age}`);
          if (fd.height) console.log(`         * Boy: ${fd.height} cm`);
          if (fd.weight) console.log(`         * Kilo: ${fd.weight} kg`);
          if (fd.workType) {
            const workTypes = {
              'desk': 'Masa Başı / Ofis',
              'active': 'Ayakta / Hareketli',
              'physical': 'Bedensel Güç Gerektiren'
            };
            console.log(`         * İş Tipi: ${workTypes[fd.workType] || fd.workType}`);
          }
          if (fd.chronicConditions) console.log(`         * Kronik Hastalıklar: ${fd.chronicConditions}`);
          if (fd.medications) console.log(`         * İlaçlar: ${fd.medications}`);
          
          // Ağrı Bölgeleri - ÖNEMLİ!
          if (fd.selectedAreas && Array.isArray(fd.selectedAreas) && fd.selectedAreas.length > 0) {
            console.log(`         * 🎯 AĞRI BÖLGELERİ (${fd.selectedAreas.length} adet):`);
            fd.selectedAreas.forEach((area, idx) => {
              console.log(`            ${idx + 1}. ${area}`);
            });
          }
          
          if (fd.manualArea) console.log(`         * Manuel Ağrı Bölgesi: ${fd.manualArea}`);
          
          // Ağrı Süresi
          if (fd.painDuration) {
            const durations = {
              'new': 'Yeni Başladı (1 aydan kısa)',
              'moderate': 'Bir Süredir Var (1-3 ay)',
              'chronic': 'Kronikleşti (3 aydan uzun)'
            };
            console.log(`         * Ağrı Süresi: ${durations[fd.painDuration] || fd.painDuration}`);
          }
          
          // Ağrı Şiddeti - ÖNEMLİ!
          if (fd.painIntensity !== undefined && fd.painIntensity !== null) {
            console.log(`         * 🔥 AĞRI ŞİDDETİ: ${fd.painIntensity}/10`);
            const intensityDesc = fd.painIntensity <= 2 ? 'Hafif' : 
                                  fd.painIntensity <= 4 ? 'Orta' : 
                                  fd.painIntensity <= 6 ? 'Orta-Şiddetli' : 
                                  fd.painIntensity <= 8 ? 'Şiddetli' : 'Çok Şiddetli';
            console.log(`            Seviye: ${intensityDesc}`);
          }
          
          // Ağrı Türleri - ÖNEMLİ!
          if (fd.selectedPainTypes && Array.isArray(fd.selectedPainTypes) && fd.selectedPainTypes.length > 0) {
            console.log(`         * 💢 AĞRI TÜRLERİ (${fd.selectedPainTypes.length} adet):`);
            fd.selectedPainTypes.forEach((type, idx) => {
              console.log(`            ${idx + 1}. ${type}`);
            });
          }
          
          // Güvenlik Soruları - ÖNEMLİ!
          if (fd.safetyAnswers) {
            console.log(`         * ⚠️ GÜVENLİK SORULARI:`);
            if (fd.safetyAnswers.surgery !== undefined) {
              console.log(`            - Son 6 ayda ameliyat: ${fd.safetyAnswers.surgery === 'yes' ? 'EVET ⚠️' : 'Hayır'}`);
            }
            if (fd.safetyAnswers.chronic !== undefined) {
              console.log(`            - Kronik hastalık: ${fd.safetyAnswers.chronic === 'yes' ? 'EVET ⚠️' : 'Hayır'}`);
            }
            if (fd.safetyAnswers.heart !== undefined) {
              console.log(`            - Kalp problemi: ${fd.safetyAnswers.heart === 'yes' ? 'EVET ⚠️' : 'Hayır'}`);
            }
            if (fd.safetyAnswers.pregnancy !== undefined) {
              console.log(`            - Hamilelik: ${fd.safetyAnswers.pregnancy === 'yes' ? 'EVET ⚠️' : 'Hayır'}`);
            }
          }
        }
        
        // Assessment Sonuçları - EN GÜNCEL
        if (user.dashboardData.assessmentResults) {
          console.log(`      📊 Assessment Sonuçları (EN GÜNCEL):`);
          const ar = user.dashboardData.assessmentResults;
          userData.dashboardData.assessmentResults = ar;
          if (ar.completedAt) {
            console.log(`         * Tamamlanma Tarihi: ${new Date(ar.completedAt).toLocaleString('tr-TR')}`);
          }
          if (user.dashboardData.lastAssessmentDate) {
            console.log(`         * Güncellenme Tarihi: ${new Date(user.dashboardData.lastAssessmentDate).toLocaleString('tr-TR')}`);
          }
        } else {
          console.log(`      📊 Assessment Sonuçları: Henüz assessment yapılmamış`);
        }
        
        // Egzersiz Programları
        if (user.dashboardData.exercisePrograms && Array.isArray(user.dashboardData.exercisePrograms) && user.dashboardData.exercisePrograms.length > 0) {
          console.log(`      💪 Egzersiz Programları: ${user.dashboardData.exercisePrograms.length} adet`);
          userData.dashboardData.exercisePrograms = user.dashboardData.exercisePrograms;
        }
        
        // İlerleme Verileri
        if (user.dashboardData.progressData) {
          console.log(`      📈 İlerleme Verileri: Var`);
          userData.dashboardData.progressData = user.dashboardData.progressData;
        }
        
        // Bildirimler
        if (user.dashboardData.notifications && Array.isArray(user.dashboardData.notifications)) {
          console.log(`      🔔 Bildirimler: ${user.dashboardData.notifications.length} adet`);
          userData.dashboardData.notifications = user.dashboardData.notifications;
        }
      } else {
        console.log(`   📦 Dashboard Verileri: Yok`);
      }

      detailedData.push(userData);
      console.log('-'.repeat(100));
    });

    // JSON dosyasına kaydet
    const jsonPath = path.join(__dirname, 'users-detailed.json');
    fs.writeFileSync(jsonPath, JSON.stringify(detailedData, null, 2), 'utf8');
    console.log(`\n💾 Detaylı veriler JSON dosyasına kaydedildi: ${jsonPath}\n`);

    console.log('\n✅ İşlem tamamlandı.\n');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

viewUsersDetailed();

