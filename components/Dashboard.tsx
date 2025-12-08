import React, { useEffect, useMemo, useRef, useState } from 'react';
import AssessmentWizard from './AssessmentWizard';
import AnalysisSummary from './AnalysisSummary';
import SupportTicketModal from './SupportTicketModal';
import HelpFAQModal from './HelpFAQModal';
import PackagesModal from './PackagesModal';
import SettingsModal from './SettingsModal';
import VideoModal from './VideoModal';
import ExerciseProgramModal from './ExerciseProgramModal';
import ProgressModal from './ProgressModal';
import AnimatedLogo from './AnimatedLogo';

interface CartItem {
  id: string;
  name: string;
  price: string;
}

type DashboardConfig = {
  user_name: string;
  welcome_subtitle: string;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  cta_duration: string;
  video_title: string;
  tip_title: string;
  tip_text: string;
  background_color: string;
  card_background: string;
  text_color: string;
  button_color: string;
  accent_color: string;
};

const defaultConfig: DashboardConfig = {
  user_name: 'Ahmet',
  welcome_subtitle: 'Bugün, ağrısız bir yaşam için harika bir başlangıç.',
  cta_title: 'Henüz Vücut Analizinizi Yapmadık',
  cta_description:
    'Size en uygun tedavi paketini belirleyebilmemiz ve ağrı haritanızı çıkarabilmemiz için 3 dakikalık ücretsiz ön değerlendirmeyi tamamlayın.',
  cta_button_text: 'Analizi Başlat',
  cta_duration: 'Yaklaşık 3 dakika sürer',
  video_title: 'Süreci İzleyin',
  tip_title: 'Biliyor muydunuz?',
  tip_text: "Kronik ağrıların %80'i doğru duruş ve egzersizle ameliyatsız iyileşebilir.",
  background_color: '#667eea',
  card_background: '#ffffff',
  text_color: '#1f2937',
  button_color: '#f59e0b',
  accent_color: '#764ba2',
};

const Dashboard: React.FC = () => {
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [hasPackage, setHasPackage] = useState(false);
  const [showExerciseProgram, setShowExerciseProgram] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item: { id: string; name: string; price?: string }) => {
    if (!cart.find(c => c.id === item.id)) {
      setCart([...cart, { id: item.id, name: item.name, price: item.price || '0' }]);
      // Close all modals and open cart
      setShowSummary(false);
      setShowPackages(false);
      setTimeout(() => setShowCart(true), 300);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\./g, '')), 0);
  };

  const healthTips = [
    { icon: '💡', title: 'Biliyor muydunuz?', text: "Kronik ağrıların %80'i doğru duruş ve egzersizle ameliyatsız iyileşebilir." },
    { icon: '🧘', title: 'Günlük İpucu', text: 'Her gün 10 dakika germe egzersizi, kas gerginliğini %40 azaltır.' },
    { icon: '🚶', title: 'Hareket Şart!', text: 'Her 45 dakikada bir 5 dakika yürümek, bel ağrısı riskini %50 düşürür.' },
    { icon: '💧', title: 'Su İçin', text: 'Günde 2 litre su içmek, eklem sağlığını korur ve kas kramplarını önler.' },
    { icon: '😴', title: 'Uyku Önemli', text: 'Kaliteli 7-8 saat uyku, kas onarımı ve ağrı yönetimi için kritiktir.' },
    { icon: '🏋️', title: 'Düzenli Egzersiz', text: 'Haftada 3 gün egzersiz, kronik ağrıyı %60 oranında azaltabilir.' },
    { icon: '🪑', title: 'Doğru Oturuş', text: 'Ergonomik oturma pozisyonu, boyun ve sırt ağrılarını önler.' },
    { icon: '🌿', title: 'Stres Yönetimi', text: 'Stres kas gerginliğini artırır. Nefes egzersizleri rahatlamanıza yardımcı olur.' },
  ];
  const [scrollProgress, setScrollProgress] = useState(0);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sdk = (window as unknown as { elementSdk?: any }).elementSdk;
    if (!sdk) return;

    sdk.init({
      defaultConfig,
      onConfigChange: (incoming: Partial<DashboardConfig>) => {
        setConfig((prev) => ({ ...prev, ...incoming }));
      },
      mapToCapabilities: (incoming: Partial<DashboardConfig>) => ({
        recolorables: [
          {
            get: () => incoming.background_color || defaultConfig.background_color,
            set: (value: string) => setConfig((prev) => ({ ...prev, background_color: value })),
          },
          {
            get: () => incoming.card_background || defaultConfig.card_background,
            set: (value: string) => setConfig((prev) => ({ ...prev, card_background: value })),
          },
          {
            get: () => incoming.text_color || defaultConfig.text_color,
            set: (value: string) => setConfig((prev) => ({ ...prev, text_color: value })),
          },
          {
            get: () => incoming.button_color || defaultConfig.button_color,
            set: (value: string) => setConfig((prev) => ({ ...prev, button_color: value })),
          },
          {
            get: () => incoming.accent_color || defaultConfig.accent_color,
            set: (value: string) => setConfig((prev) => ({ ...prev, accent_color: value })),
          },
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined,
      }),
      mapToEditPanelValues: (incoming: Partial<DashboardConfig>) =>
        new Map<string, string>([
          ['user_name', incoming.user_name || defaultConfig.user_name],
          ['welcome_subtitle', incoming.welcome_subtitle || defaultConfig.welcome_subtitle],
          ['cta_title', incoming.cta_title || defaultConfig.cta_title],
          ['cta_description', incoming.cta_description || defaultConfig.cta_description],
          ['cta_button_text', incoming.cta_button_text || defaultConfig.cta_button_text],
          ['cta_duration', incoming.cta_duration || defaultConfig.cta_duration],
          ['video_title', incoming.video_title || defaultConfig.video_title],
          ['tip_title', incoming.tip_title || defaultConfig.tip_title],
          ['tip_text', incoming.tip_text || defaultConfig.tip_text],
        ]),
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const gradientBackground = useMemo(
    () => `linear-gradient(135deg, ${config.background_color} 0%, ${config.accent_color} 100%)`,
    [config.background_color, config.accent_color]
  );

  const buttonGradient = useMemo(
    () => `linear-gradient(135deg, ${config.button_color} 0%, #f97316 100%)`,
    [config.button_color]
  );

  const handleAnalysisStart = () => {
    setAnalysisLoading(true);
    setTimeout(() => {
      setAnalysisLoading(false);
      setShowWizard(true);
    }, 600);
  };

  const handleLockedClick = (isPremium: boolean) => {
    setToast(
      isPremium
        ? 'Premium özellik: Fizyoterapistinizle mesajlaşmak için premium paket gerekir.'
        : 'Bu özelliği kullanmak için önce paket satın almalısınız.'
    );
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current?.contains(target) || profileRef.current?.contains(target)) return;
      setShowProfile(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const scrolled = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Rotating health tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
    }, 8000); // 8 saniyede bir değişir
    return () => clearInterval(tipInterval);
  }, [healthTips.length]);

  return (
    <div className="dashboard-wrapper" style={{ minHeight: '100vh', background: gradientBackground }}>
      <style>{`
        body { margin: 0; padding: 0; box-sizing: border-box; }
        * { box-sizing: inherit; }
        .dashboard-wrapper { display: flex; height: 100%; width: 100%; position: relative; }
        .sidebar { width: 260px; background: #fff; box-shadow: 2px 0 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; height: 100%; }
        .sidebar-header { padding: 24px; border-bottom: 1px solid #e5e7eb; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-progress { width: 100%; height: 3px; background: #e5e7eb; border-radius: 999px; margin-top: 10px; overflow: hidden; }
        .logo-progress-inner { height: 100%; background: linear-gradient(90deg, #667eea, #22c55e); transition: width 0.15s ease-out; }
        .menu-items { flex: 1; padding: 16px 0; overflow-y: auto; }
        .menu-section-title { padding: 20px 24px 8px 24px; font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #9ca3af; text-transform: uppercase; }
        .menu-divider { height: 1px; background: #e5e7eb; margin: 12px 16px; }
        .menu-item { display: flex; align-items: center; padding: 14px 24px; color: #4b5563; cursor: pointer; transition: all 0.2s; font-size: 15px; gap: 12px; }
        .menu-item:hover { background: #f3f4f6; color: #667eea; }
        .menu-item.active { background: #eef2ff; color: #667eea; border-right: 3px solid #667eea; }
        .menu-item.locked { opacity: 0.55; cursor: not-allowed; }
        .menu-item.premium-feature { position: relative; }
        .menu-item.premium-feature::after { content: 'PREMIUM'; position: absolute; right: 50px; font-size: 9px; font-weight: 700; color: #f59e0b; background: #fef3c7; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.5px; }
        .main-content { flex: 1; overflow-y: auto; height: 100%; }
        .top-bar { background: #fff; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); position: relative; }
        .welcome-text h1 { font-size: 28px; font-weight: 600; color: ${config.text_color}; margin: 0 0 4px 0; }
        .welcome-text p { font-size: 15px; color: #6b7280; margin: 0; }
        .top-bar-right { display: flex; align-items: center; gap: 20px; position: relative; }
        .notification-bell { width: 40px; height: 40px; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 18px; }
        .notification-bell:hover { background: #e5e7eb; }
        
        /* Cart Styles */
        .cart-wrapper { position: relative; }
        .cart-bell { width: 40px; height: 40px; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 18px; position: relative; }
        .cart-bell:hover { background: #d1fae5; }
        .cart-badge { position: absolute; top: -4px; right: -4px; width: 20px; height: 20px; background: #ef4444; color: #fff; font-size: 11px; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: bounce 0.5s ease; }
        @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        .cart-overlay { position: fixed; inset: 0; z-index: 999; }
        .cart-dropdown { position: absolute; top: 50px; right: 0; width: 320px; background: #fff; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); border: 1px solid #e5e7eb; overflow: hidden; z-index: 1000; animation: slideDown 0.2s ease; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .cart-header { background: linear-gradient(135deg, #10b981, #059669); color: #fff; padding: 14px 16px; font-size: 15px; font-weight: 700; }
        .cart-empty { padding: 30px; text-align: center; color: #9ca3af; font-size: 14px; }
        .cart-items { max-height: 240px; overflow-y: auto; }
        .cart-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #f3f4f6; }
        .cart-item-info { display: flex; flex-direction: column; gap: 2px; }
        .cart-item-name { font-size: 13px; font-weight: 600; color: #1f2937; }
        .cart-item-price { font-size: 14px; font-weight: 700; color: #10b981; }
        .cart-item-remove { background: none; border: none; color: #ef4444; font-size: 16px; cursor: pointer; padding: 4px; border-radius: 4px; }
        .cart-item-remove:hover { background: #fef2f2; }
        .cart-footer { padding: 14px 16px; background: #f9fafb; border-top: 1px solid #e5e7eb; }
        .cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cart-total span:first-child { font-size: 14px; color: #6b7280; font-weight: 500; }
        .cart-total-price { font-size: 20px; font-weight: 800; color: #10b981; }
        .cart-checkout-btn { width: 100%; padding: 12px; background: linear-gradient(135deg, #10b981, #059669); border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .cart-checkout-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
        .profile-pic { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; font-size: 16px; cursor: pointer; position: relative; }
        .content-area { padding: 32px; max-width: 1200px; margin: 0 auto; }
        .main-cta-card { background: ${config.card_background}; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 32px; display: flex; gap: 32px; align-items: center; }
        .cta-illustration { width: 180px; height: 180px; flex-shrink: 0; }
        .cta-content h2 { font-size: 26px; font-weight: 600; color: ${config.text_color}; margin: 0 0 12px 0; }
        .cta-content p { font-size: 16px; color: #6b7280; line-height: 1.6; margin: 0 0 24px 0; }
        .cta-button { background: ${buttonGradient}; color: #fff; border: none; padding: 16px 32px; font-size: 17px; font-weight: 600; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); display: inline-flex; align-items: center; gap: 8px; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4); }
        .duration-hint { display: inline-block; margin-left: 12px; font-size: 14px; color: #9ca3af; font-weight: normal; }
        .info-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .info-card { background: ${config.card_background}; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.3s; cursor: pointer; }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
        .info-card-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 16px; }
        .video-card .info-card-icon { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); }
        .tip-card .info-card-icon { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .info-card h3 { font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 8px 0; }
        .info-card p { font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0; }
        .tip-carousel { position: relative; overflow: hidden; }
        .tip-carousel .info-card-icon { transition: transform 0.5s ease; }
        .tip-title-animated, .tip-text-animated { 
          animation: tipFadeIn 0.5s ease; 
        }
        @keyframes tipFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tip-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
        }
        .tip-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          cursor: pointer;
          transition: all 0.3s;
        }
        .tip-dot:hover { background: #9ca3af; }
        .tip-dot.active { 
          background: #10b981; 
          width: 24px; 
          border-radius: 4px; 
        }
        .profile-dropdown { position: absolute; top: 70px; right: 32px; width: 320px; background: #fff; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.25s ease; z-index: 1000; border: 1px solid #e5e7eb; }
        .profile-dropdown.active { opacity: 1; visibility: visible; transform: translateY(0); }
        .profile-card-header { padding: 20px; border-bottom: 1px solid #e5e7eb; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px 16px 0 0; color: #fff; }
        .profile-avatar-large { width: 70px; height: 70px; border-radius: 50%; background: #fff; color: #667eea; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 700; margin: 0 auto 10px auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
        .profile-name { font-size: 18px; font-weight: 700; margin: 0 0 4px 0; }
        .premium-badge-inline { display: inline-flex; align-items: center; gap: 6px; background: rgba(251, 191, 36, 0.18); color: #b45309; padding: 4px 10px; border-radius: 16px; font-size: 11px; font-weight: 700; border: 1px solid rgba(251, 191, 36, 0.35); }
        .profile-menu-section { padding: 14px 0; }
        .profile-menu-section:not(:last-child) { border-bottom: 1px solid #f3f4f6; }
        .profile-section-title { padding: 8px 16px; font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: 1px; text-transform: uppercase; }
        .profile-menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #374151; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .profile-menu-item:hover { background: #f9fafb; color: #4f46e5; }
        .profile-menu-item.danger:hover { background: #fef2f2; color: #dc2626; }
        .profile-menu-icon { font-size: 18px; width: 22px; text-align: center; }
        .profile-menu-text { flex: 1; }
        .profile-menu-text .subtitle { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        @media (max-width: 768px) {
          .sidebar { position: fixed; left: -260px; z-index: 100; transition: left 0.3s; }
          .sidebar.open { left: 0; }
          .main-cta-card { flex-direction: column; text-align: center; }
          .cta-illustration { width: 140px; height: 140px; }
          .profile-dropdown { right: 16px; width: calc(100% - 32px); }
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <AnimatedLogo size={56} />
            <span style={{ fontSize: 20, fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EgzersizLab</span>
          </div>
          <div className="logo-progress">
            <div className="logo-progress-inner" style={{ width: `${scrollProgress}%` }} />
          </div>
        </div>
        <div className="menu-items">
          <div className="menu-section-title">PANEL</div>
          <div className="menu-item active">
            <span role="img" aria-label="home">🏠</span>
            <span>Ana Sayfa</span>
          </div>
          {hasPackage ? (
            <div className="menu-item" onClick={() => setShowExerciseProgram(true)}>
              <span role="img" aria-label="exercise">🧘</span>
              <span>Egzersiz Programım</span>
              <span>✅</span>
            </div>
          ) : (
            <div className="menu-item locked" onClick={() => handleLockedClick(false)}>
              <span role="img" aria-label="exercise">🧘</span>
              <span>Egzersiz Programım</span>
              <span>🔒</span>
            </div>
          )}
          {hasPackage ? (
            <div className="menu-item" onClick={() => setShowProgress(true)}>
              <span role="img" aria-label="calendar">📅</span>
              <span>Takvim / İlerleme</span>
              <span>✅</span>
            </div>
          ) : (
            <div className="menu-item locked" onClick={() => handleLockedClick(false)}>
              <span role="img" aria-label="calendar">📅</span>
              <span>Takvim / İlerleme</span>
              <span>🔒</span>
            </div>
          )}
          <div className="menu-divider" />
          <div className="menu-section-title">DESTEK & İLETİŞİM</div>
          <div className="menu-item locked premium-feature" onClick={() => handleLockedClick(true)}>
            <span role="img" aria-label="chat">💬</span>
            <span>Fizyoterapiste Sor</span>
            <span>🔒</span>
          </div>
          <div className="menu-item" onClick={() => setShowSupport(true)}>
            <span role="img" aria-label="ticket">🎟️</span>
            <span>Destek Talebi</span>
          </div>
          <div className="menu-item" onClick={() => setShowFAQ(true)}>
            <span role="img" aria-label="help">❓</span>
            <span>Yardım / SSS</span>
          </div>
          <div className="menu-divider" />
          <div className="menu-section-title">HESAP & AYARLAR</div>
          <div className="menu-item" onClick={() => setShowPackages(true)}>
            <span role="img" aria-label="package">📦</span>
            <span>Paketlerim & Ödemeler</span>
          </div>
          <div className="menu-item" onClick={() => setShowSettings(true)}>
            <span role="img" aria-label="settings">⚙️</span>
            <span>Ayarlar</span>
          </div>
          <div className="menu-item" onClick={handleLogout}>
            <span role="img" aria-label="logout">🚪</span>
            <span>Çıkış Yap</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="welcome-text">
            <h1 id="welcome-title">Merhaba, {config.user_name} 👋</h1>
            <p id="welcome-subtitle">{config.welcome_subtitle}</p>
          </div>
          <div className="top-bar-right">
            <div className="notification-bell" title="Bildirimler">🔔</div>
            
            {/* Cart Button */}
            <div className="cart-wrapper">
              <div 
                className="cart-bell" 
                title="Sepetim"
                onClick={() => setShowCart(!showCart)}
              >
                🛒
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </div>
              
              {/* Cart Dropdown with Overlay */}
              {showCart && (
                <>
                <div className="cart-overlay" onClick={() => setShowCart(false)} />
                <div className="cart-dropdown">
                  <div className="cart-header">
                    🛒 Sepetim ({cart.length})
                  </div>
                  {cart.length === 0 ? (
                    <div className="cart-empty">Sepetiniz boş</div>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cart.map(item => (
                          <div key={item.id} className="cart-item">
                            <div className="cart-item-info">
                              <span className="cart-item-name">{item.name}</span>
                              <span className="cart-item-price">{item.price}₺</span>
                            </div>
                            <button 
                              className="cart-item-remove"
                              onClick={() => removeFromCart(item.id)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-footer">
                        <div className="cart-total">
                          <span>Toplam:</span>
                          <span className="cart-total-price">{getCartTotal().toLocaleString()}₺</span>
                        </div>
                        <button className="cart-checkout-btn">
                          💳 Ödemeye Geç
                        </button>
                      </div>
                    </>
                  )}
                </div>
                </>
              )}
            </div>
            
            <div
              className="profile-pic"
              title="Profil"
              onClick={(e) => {
                e.stopPropagation();
                toggleProfile();
              }}
              ref={profileRef}
              aria-label="Profil menüsü"
            >
              {config.user_name?.charAt(0).toUpperCase()}
            </div>
            <div className={`profile-dropdown ${showProfile ? 'active' : ''}`} ref={dropdownRef}>
              <div className="profile-card-header">
                <div className="profile-avatar-large">{config.user_name?.charAt(0).toUpperCase()}</div>
                <div className="profile-name">{config.user_name}</div>
                <span className="premium-badge-inline">⭐ Premium Üye</span>
              </div>
              <div className="profile-menu-section">
                <div className="profile-section-title">Kişisel Sağlık Verileri</div>
                <div className="profile-menu-item">
                  <span className="profile-menu-icon">📸</span>
                  <div className="profile-menu-text">
                    <div>Vücut Fotoğraflarım</div>
                    <div className="subtitle">Postür fotoğraflarını görüntüle</div>
                  </div>
                </div>
                <div className="profile-menu-item">
                  <span className="profile-menu-icon">📋</span>
                  <div className="profile-menu-text">
                    <div>Anamnez Bilgilerim</div>
                    <div className="subtitle">Ağrı haritası ve sağlık geçmişi</div>
                  </div>
                </div>
                <div className="profile-menu-item">
                  <span className="profile-menu-icon">📏</span>
                  <div className="profile-menu-text">
                    <div>Fiziksel Ölçümlerim</div>
                    <div className="subtitle">Boy, kilo, BMI ve ölçüler</div>
                  </div>
                </div>
              </div>
              <div className="profile-menu-section">
                <div className="profile-section-title">Hesap Yönetimi</div>
                <div className="profile-menu-item">
                  <span className="profile-menu-icon">🔒</span>
                  <div className="profile-menu-text">
                    <div>Şifre Değiştir</div>
                  </div>
                </div>
                <div className="profile-menu-item danger" onClick={handleLogout}>
                  <span className="profile-menu-icon">🚪</span>
                  <div className="profile-menu-text">
                    <div>Güvenli Çıkış</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="main-cta-card">
            <div className="cta-illustration">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="60" r="30" fill="#667eea" opacity="0.2" />
                <circle cx="100" cy="60" r="20" fill="#667eea" />
                <rect x="75" y="90" width="50" height="70" rx="5" fill="#667eea" />
                <rect x="70" y="100" width="15" height="40" rx="7" fill="#f59e0b" />
                <rect x="115" y="100" width="15" height="40" rx="7" fill="#f59e0b" />
                <rect x="85" y="155" width="12" height="35" rx="6" fill="#667eea" />
                <rect x="103" y="155" width="12" height="35" rx="6" fill="#667eea" />
                <rect x="130" y="80" width="50" height="70" rx="4" fill="white" stroke="#667eea" strokeWidth="2" />
                <line x1="140" y1="100" x2="170" y2="100" stroke="#667eea" strokeWidth="2" />
                <line x1="140" y1="115" x2="170" y2="115" stroke="#667eea" strokeWidth="2" />
                <line x1="140" y1="130" x2="165" y2="130" stroke="#667eea" strokeWidth="2" />
              </svg>
            </div>
            <div className="cta-content">
              <h2 id="cta-title">{config.cta_title}</h2>
              <p id="cta-description">{config.cta_description}</p>
              <button className="cta-button" onClick={handleAnalysisStart} disabled={analysisLoading}>
                <span>▶</span>
                <span id="cta-button-text">
                  {analysisLoading ? 'Yönlendiriliyorsunuz...' : config.cta_button_text}
                </span>
              </button>
              <span className="duration-hint" id="cta-duration">
                {config.cta_duration}
              </span>
            </div>
          </div>

          <div className="info-cards">
            <div className="info-card video-card" onClick={() => setShowVideo(true)}>
              <div className="info-card-icon">🎬</div>
              <h3 id="video-title">{config.video_title}</h3>
              <p>1 dakikalık "Sistem Nasıl İşliyor?" videosunu izleyerek süreci daha iyi anlayabilirsiniz.</p>
            </div>
            <div className="info-card tip-card tip-carousel">
              <div className="info-card-icon">{healthTips[currentTipIndex].icon}</div>
              <h3 className="tip-title-animated">{healthTips[currentTipIndex].title}</h3>
              <p className="tip-text-animated">{healthTips[currentTipIndex].text}</p>
              <div className="tip-dots">
                {healthTips.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`tip-dot ${idx === currentTipIndex ? 'active' : ''}`}
                    onClick={() => setCurrentTipIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: '#fef3c7',
            color: '#92400e',
            padding: '16px 20px',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            fontSize: 14,
            maxWidth: 320,
            lineHeight: 1.5,
          }}
        >
          {toast}
        </div>
      )}

      <AssessmentWizard
        open={showWizard}
        onClose={() => setShowWizard(false)}
        onComplete={() => {
          setShowSummary(true);
        }}
      />
      <AnalysisSummary open={showSummary} onClose={() => setShowSummary(false)} onAddToCart={addToCart} cartItems={cart} />
      <SupportTicketModal open={showSupport} onClose={() => setShowSupport(false)} />
      <HelpFAQModal open={showFAQ} onClose={() => setShowFAQ(false)} onOpenSupport={() => setShowSupport(true)} />
      <PackagesModal open={showPackages} onClose={() => setShowPackages(false)} onPurchase={() => { setHasPackage(true); setShowPackages(false); }} onCancelPackage={() => setHasPackage(false)} hasPackage={hasPackage} onAddToCart={addToCart} cartItems={cart} />
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} />
      <ExerciseProgramModal open={showExerciseProgram} onClose={() => setShowExerciseProgram(false)} />
      <ProgressModal open={showProgress} onClose={() => setShowProgress(false)} />
    </div>
  );
};

export default Dashboard;
