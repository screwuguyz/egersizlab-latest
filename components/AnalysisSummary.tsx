import React from 'react';

interface AnalysisSummaryProps {
  open: boolean;
  onClose: () => void;
  onAddToCart?: (item: { id: string; name: string; price?: string }) => void;
  cartItems?: { id: string }[];
}

type PackageItem = {
  id: string;
  badge?: string;
  name: string;
  subtitle?: string;
  price?: string;
  features: string[];
  gradient: string;
  accent: string;
};

const packages: PackageItem[] = [
  {
    id: 'basic',
    badge: 'Temel',
    name: 'Temel Analiz & Egzersiz Planı',
    subtitle: 'Vücudunuzun neye ihtiyacı olduğunu öğrenin ve hemen başlayın.',
    price: '599',
    features: [
      'Detaylı anamnez değerlendirmesi',
      'Fizyoterapist tarafından vaka analizi',
      '4-6 haftalık kişiye özel egzersiz reçetesi',
      'Egzersiz videoları ve açıklamaları',
    ],
    gradient: 'from-white to-slate-50',
    accent: 'text-gray-700',
  },
  {
    id: 'medium',
    badge: '⭐ Önerilen',
    name: 'Klinik Takip & İlerleme Paketi',
    subtitle: 'Sadece bir liste değil, dinamik bir iyileşme süreci.',
    price: '1.299',
    features: [
      'Temel paketteki tüm hizmetler',
      'Haftalık kontrol ve değerlendirme',
      'Ağrı ve gelişime göre program revizyonu',
      'Sistem üzerinden soru-cevap hakkı',
      '1 aylık aktif takip',
    ],
    gradient: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-700',
  },
  {
    id: 'premium',
    badge: '👑 Premium',
    name: 'Premium Danışmanlık & Video Analizi',
    subtitle: 'Fizyoterapistiniz cebinizde; yanlış yapma riskini sıfıra indirin.',
    price: '2.499',
    features: [
      'Tüm paketlerdeki hizmetler',
      'Video analizi: egzersizlerinizi kaydedin, geri bildirim alın',
      'Hızlı destek (chat/WhatsApp)',
      'Öncelikli değerlendirme (aynı gün dönüş)',
      'Sınırsız program güncellemesi',
    ],
    gradient: 'from-amber-50 to-orange-50',
    accent: 'text-orange-700',
  },
];

const lockedTests = [
  { icon: '🛡️', title: 'Detayli Kas Kuvvet Analizi', subtitle: 'Manuel kas testi simulasyonu', desc: 'Hangi kaslariniz uykuda, hangileri asiri calisiyor? (Gluteal amnezi, core stabilizasyonu vb.)' },
  { icon: '📏', title: 'Kas Kisalik ve Esneklik Testleri', subtitle: '', desc: 'Agrisinin sebebi kas kisaligi mi? Hamstring, pektoral, iliopsoas, piriformis gerginlik testleri.' },
  { icon: '📐', title: 'Eklem Hareket Acikligi', subtitle: 'Gonyometrik analiz', desc: 'Eklemler tam aciyla hareket ediyor mu, kisitlilik derecesi nedir?' },
  { icon: '🧠', title: 'Norodinamik Testler', subtitle: 'Sinir germe testleri', desc: 'Agri kas kaynakli mi yoksa sinir sikismasi mi (Fitik/Siyatik)?' },
  { icon: '⚖️', title: 'Fonksiyonel Denge ve Propriosepsiyon', subtitle: '', desc: 'Vucudun uzaydaki konum algisi ve denge stratejisi.' },
  { icon: '🩺', title: 'Hareket Kalitesi Analizi', subtitle: '', desc: 'Comelme, egilme ve uzanma sirasinda omurga biyomekanigi kontrolu.' },
];

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ open, onClose, onAddToCart, cartItems = [] }) => {
  const isInCart = (id: string) => cartItems.some(item => item.id === id);

  const handleAddToCart = (pkg: { id: string; name: string; price?: string }) => {
    if (!isInCart(pkg.id) && onAddToCart) {
      onAddToCart(pkg);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[99vw] h-[98vh] max-w-[1800px] rounded-xl shadow-2xl overflow-hidden relative summary-shell">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 z-20"
          aria-label="Kapat"
        >
          ×
        </button>

        <div className="summary-content grid lg:grid-cols-3 gap-2 p-2 h-full">
          {/* Flow arrows hidden for compact view */}

          <div className="hero-col">
            {/* Success Badge */}
            <div className="success-badge-lg">
              <span className="success-check">✓</span>
              <span>Ön Profiliniz Sisteme İşlendi</span>
            </div>

            {/* Status Card */}
            <div className="status-card-lg">
              <div className="status-icon-lg">📤</div>
              <h3 className="status-title-lg">Verileriniz Fizyoterapiste İletildi</h3>
              <p className="status-sub-lg">✓ Tüm fotoğraflar ve ağrı haritanız başarıyla gönderildi</p>
              
              {/* AI Banner */}
              <div className="ai-banner-lg">
                <span className="ai-icon-lg">🤖</span>
                <div className="ai-text-lg">
                  <strong>Yapay Zeka Ön Analizi Devam Ediyor</strong>
                  <span>Duruş analizi, kas dengesizlik tespiti işleniyor...</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-card-lg">
              <span className="cta-badge-lg">🎯 SON ADIM</span>
              <p className="cta-text-lg">Fizyoterapistinizin egzersiz reçetenizi hazırlayabilmesi için <strong>size uygun paketi seçin</strong></p>
            </div>

            {/* Progress */}
            <div className="progress-card-lg">
              <div className="progress-header-lg">
                <span>Süreç İlerlemesi</span>
                <span className="progress-pct-lg">75%</span>
              </div>
              <div className="progress-track-lg">
                <div className="progress-fill-lg" style={{ width: '75%' }}></div>
              </div>
              <div className="progress-steps-lg">
                <span className="step-lg done">✓ Bilgiler Gönderildi</span>
                <span className="step-lg current">⏳ Paket Seçimi</span>
              </div>
            </div>
          </div>

          <div className="packages-col">
            <h3 className="col-title-lg">🎁 Hizmet Paketleri</h3>
            <div className="packages-list">
              {packages.map((pkg) => {
                const inCart = isInCart(pkg.id);
                return (
                  <div key={pkg.id} className={`pkg-card ${pkg.id === 'medium' ? 'recommended' : ''} ${inCart ? 'in-cart' : ''}`}>
                    <div className="pkg-top">
                      <span className={`pkg-badge-lg ${pkg.id}`}>{pkg.badge}</span>
                      <span className="pkg-price-lg">{pkg.price}<small>₺</small></span>
                    </div>
                    <div className="pkg-name-lg">{pkg.name}</div>
                    <ul className="pkg-features-lg">
                      {pkg.features.slice(0, 3).map((f, idx) => (
                        <li key={idx}><span className="feat-check-lg">✓</span>{f}</li>
                      ))}
                      {pkg.features.length > 3 && <li className="more-feat">+{pkg.features.length - 3} özellik daha</li>}
                    </ul>
                    {inCart ? (
                      <button className="cart-btn-lg added">
                        ✓ Sepete Eklendi
                      </button>
                    ) : (
                      <button 
                        className={`cart-btn-lg ${pkg.id === 'medium' ? 'green' : ''}`}
                        onClick={() => handleAddToCart(pkg)}
                      >
                        🛒 Sepete Ekle
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="tests-col">
            <h3 className="col-title-lg">🔒 Paket Sonrası Klinik Testler</h3>
            <p className="col-sub-lg">Bu testler olmadan reçete yazmayız; paket alımından sonra uygulayacağız.</p>
            <div className="tests-grid">
              {lockedTests.map((test, idx) => (
                <div key={idx} className="test-item">
                  <span className="test-icon-lg">{test.icon}</span>
                  <div className="test-content">
                    <span className="test-title-lg">{test.title}</span>
                    {test.subtitle && <span className="test-subtitle">{test.subtitle}</span>}
                    <span className="test-desc-lg">{test.desc}</span>
                  </div>
                  <span className="lock-icon">🔒</span>
                </div>
              ))}
            </div>
            <div className="info-box-lg">
              <span className="info-icon-lg">💡</span>
              <div>
                <strong>Neden bu testler?</strong>
                <span>Egzersiz bir ilaçtır; rastgele verilemez. Bu testlerle nokta atışı tedavi protokolü oluşturuyoruz.</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <style>{`
        .summary-shell {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .summary-content {
          position: relative;
          flex: 1;
          overflow: hidden;
        }
        
        /* Hero Column */
        .hero-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
          height: 100%;
        }
        .success-badge-lg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          padding: 10px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          width: fit-content;
          align-self: center;
        }
        .success-check {
          width: 20px;
          height: 20px;
          background: #fff;
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }
        .status-card-lg {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          text-align: center;
        }
        .status-icon-lg {
          font-size: 36px;
          margin-bottom: 6px;
        }
        .status-title-lg {
          font-size: 16px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 4px 0;
        }
        .status-sub-lg {
          font-size: 12px;
          color: #10b981;
          font-weight: 600;
          margin: 0 0 10px 0;
        }
        .ai-banner-lg {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          padding: 10px 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }
        .ai-icon-lg {
          font-size: 24px;
        }
        .ai-text-lg {
          color: #fff;
        }
        .ai-text-lg strong {
          display: block;
          font-size: 13px;
        }
        .ai-text-lg span {
          font-size: 11px;
          opacity: 0.9;
        }
        .cta-card-lg {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          padding: 12px 16px;
          border-radius: 12px;
          text-align: center;
        }
        .cta-badge-lg {
          display: inline-block;
          background: rgba(255,255,255,0.9);
          color: #ea580c;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .cta-text-lg {
          font-size: 13px;
          color: #fff;
          margin: 0;
          line-height: 1.3;
        }
        .cta-text-lg strong {
          font-size: 15px;
        }
        .progress-card-lg {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px;
        }
        .progress-header-lg {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 6px;
        }
        .progress-pct-lg {
          background: #10b981;
          color: #fff;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }
        .progress-track-lg {
          height: 8px;
          background: #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-fill-lg {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #34d399);
          border-radius: 8px;
        }
        .progress-steps-lg {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .step-lg {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 6px;
          background: #fff;
          border: 1px solid #e2e8f0;
          color: #64748b;
        }
        .step-lg.done {
          background: #ecfdf5;
          border-color: #a7f3d0;
          color: #047857;
        }
        .step-lg.current {
          background: #fef3c7;
          border-color: #fde047;
          color: #a16207;
        }
        
        /* Packages Column */
        .packages-col, .tests-col {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .col-title-lg {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          text-align: center;
          margin: 0 0 8px 0;
        }
        .col-sub-lg {
          font-size: 11px;
          color: #64748b;
          text-align: center;
          margin: 0 0 8px 0;
        }
        .packages-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          overflow: hidden;
        }
        .pkg-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .pkg-card.recommended {
          border-color: #10b981;
          background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
        }
        .pkg-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .pkg-badge-lg {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          background: #e2e8f0;
          color: #64748b;
        }
        .pkg-badge-lg.medium {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
        }
        .pkg-badge-lg.premium {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
        }
        .pkg-price-lg {
          font-size: 18px;
          font-weight: 800;
          color: #1e293b;
        }
        .pkg-price-lg small {
          font-size: 12px;
          color: #64748b;
        }
        .pkg-name-lg {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .pkg-features-lg {
          list-style: none;
          padding: 0;
          margin: 0 0 6px 0;
          flex: 1;
          overflow: hidden;
        }
        .pkg-features-lg li {
          font-size: 11px;
          color: #475569;
          padding: 2px 0;
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }
        .pkg-features-lg .more-feat {
          color: #94a3b8;
          font-style: italic;
          padding-left: 14px;
        }
        .feat-check-lg {
          color: #10b981;
          font-weight: 700;
          flex-shrink: 0;
        }
        .cart-btn-lg {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .cart-btn-lg:hover {
          transform: translateY(-1px);
        }
        .cart-btn-lg.green {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        .cart-btn-lg.added {
          background: linear-gradient(135deg, #6b7280, #4b5563);
        }
        .cart-btn-lg.added:hover {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        .pkg-card.in-cart {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        
        /* Tests Column */
        .tests-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          flex: 1;
          overflow: hidden;
        }
        .test-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px;
          min-height: 0;
          overflow: hidden;
        }
        .test-icon-lg {
          font-size: 18px;
          flex-shrink: 0;
        }
        .test-content {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }
        .test-title-lg {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.2;
        }
        .test-subtitle {
          display: block;
          font-size: 9px;
          color: #6366f1;
          font-weight: 600;
        }
        .test-desc-lg {
          display: block;
          font-size: 10px;
          color: #64748b;
          line-height: 1.2;
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .lock-icon {
          font-size: 12px;
          opacity: 0.5;
          flex-shrink: 0;
        }
        .info-box-lg {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid #fbbf24;
          border-radius: 8px;
          padding: 8px;
          margin-top: 6px;
          flex-shrink: 0;
        }
        .info-icon-lg {
          font-size: 18px;
          flex-shrink: 0;
        }
        .info-box-lg strong {
          font-size: 12px;
          color: #92400e;
          margin-right: 4px;
        }
        .info-box-lg span {
          font-size: 11px;
          color: #a16207;
        }
        
        /* Checkout Bar */
        .checkout-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #10b981, #059669);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
          z-index: 30;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .checkout-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .checkout-items {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }
        .checkout-total {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
        }
        .checkout-btn {
          padding: 12px 32px;
          background: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 800;
          color: #059669;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        /* New Hero Surface */
        .hero-surface-new {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        /* Success Badge */
        .success-badge-new {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          padding: 10px 18px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
          width: fit-content;
        }
        .success-icon-new {
          width: 22px;
          height: 22px;
          background: #fff;
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }
        
        /* Status Card */
        .status-card-new {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .status-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }
        .status-icon-bg {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }
        .status-title-new {
          text-align: center;
          font-size: 18px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 6px 0;
        }
        .status-sub-new {
          text-align: center;
          font-size: 12px;
          color: #10b981;
          font-weight: 600;
          margin: 0 0 14px 0;
        }
        
        /* AI Banner */
        .ai-banner-new {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 12px 14px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }
        .ai-pulse {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: aiPulse 2s ease-in-out infinite;
        }
        @keyframes aiPulse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .ai-icon-new {
          font-size: 24px;
          z-index: 1;
        }
        .ai-text-new {
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 1;
        }
        .ai-title-new {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }
        .ai-sub-new {
          font-size: 11px;
          color: rgba(255,255,255,0.8);
        }
        
        /* CTA Card */
        .cta-card-new {
          background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
        }
        .cta-badge-new {
          display: inline-block;
          background: rgba(255,255,255,0.9);
          color: #ea580c;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .cta-text-new {
          font-size: 14px;
          color: #fff;
          margin: 0;
          line-height: 1.4;
        }
        .cta-text-new strong {
          display: block;
          font-size: 16px;
          margin-top: 4px;
        }
        
        /* Progress */
        .progress-new {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
        }
        .progress-header-new {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }
        .progress-pct-new {
          background: #10b981;
          color: #fff;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }
        .progress-track-new {
          height: 8px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progress-fill-new {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #34d399);
          border-radius: 10px;
          transition: width 0.5s ease;
        }
        .progress-steps-new {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .pstep {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid #e2e8f0;
          color: #64748b;
        }
        .pstep.done {
          background: #ecfdf5;
          border-color: #a7f3d0;
          color: #047857;
        }
        .pstep.current {
          background: #fef3c7;
          border-color: #fde047;
          color: #a16207;
        }
        
        /* Legacy styles */
        .hero-progress { display: grid; gap: 8px; justify-items: center; color: white; }
        .progress-bar-container { width: 100%; max-width: 620px; }
        .progress-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 13px; font-weight: 700; opacity: 0.95; }
        .progress-label span:first-child { color: #0f172a; text-shadow: 0 1px 2px rgba(255,255,255,0.6); }
        .progress-percentage { font-size: 12px; font-weight: 800; color: #0f172a; background: white; padding: 4px 10px; border-radius: 20px; box-shadow: 0 6px 14px rgba(0,0,0,0.15); }
        .progress-bar-bg { width: 100%; height: 12px; background: rgba(255,255,255,0.18); border-radius: 999px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0,0,0,0.1); position: relative; }
        .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #22c55e 0%, #34d399 100%); border-radius: 999px; box-shadow: 0 0 18px rgba(34, 197, 94, 0.8); }
        .progress-steps { display: flex; justify-content: center; gap: 16px; font-size: 13px; opacity: 0.98; }
        .step-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 12px; background: rgba(255,255,255,0.85); color: #0f172a; box-shadow: 0 6px 14px rgba(0,0,0,0.12); font-weight: 700; }
        .step-item .step-icon { font-size: 16px; }
        .step-item.completed { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.25); }

        .info-box {
          background: linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%);
          border: 2px solid #f39c12;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        
        /* Package Cards New */
        .pkg-card-new {
          transition: all 0.2s;
        }
        .pkg-card-new:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .pkg-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          background: #f1f5f9;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .pkg-badge.recommended {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
        }
        .pkg-badge.premium {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
        }
        .pkg-price {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .price-amount {
          font-size: 20px;
          font-weight: 800;
          color: #1e293b;
        }
        .price-currency {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }
        .pkg-features {
          list-style: none;
          padding: 0;
          margin: 0 0 10px 0;
          font-size: 11px;
          color: #475569;
        }
        .pkg-features li {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          padding: 3px 0;
        }
        .feat-check {
          color: #10b981;
          font-weight: 700;
          flex-shrink: 0;
        }
        .more-features {
          color: #94a3b8;
          font-style: italic;
          padding-left: 16px !important;
        }
        .add-to-cart-btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .add-to-cart-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        }
        .add-to-cart-btn.recommended {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        .add-to-cart-btn.recommended:hover {
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }
        .flow-arrow {
          position: absolute;
          top: 45%;
          font-size: 42px;
          color: rgba(16, 185, 129, 0.9);
          text-shadow: 0 6px 16px rgba(16,185,129,0.4);
          pointer-events: none;
          animation: arrowPulse 1.4s ease-in-out infinite;
          z-index: 10;
        }
        .flow-left { left: 33.33%; transform: translate(-50%, -50%); }
        .flow-right { left: 66.66%; transform: translate(-50%, -50%); }
        @keyframes arrowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AnalysisSummary;
