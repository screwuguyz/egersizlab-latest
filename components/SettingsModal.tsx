import React, { useState } from 'react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'privacy' | 'appearance'>('profile');
  
  // Profile
  const [name, setName] = useState('Ahmet Yılmaz');
  const [email, setEmail] = useState('ahmet@email.com');
  const [phone, setPhone] = useState('0555 123 45 67');
  
  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [reminderNotif, setReminderNotif] = useState(true);
  
  // Privacy
  const [profileVisible, setProfileVisible] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);
  
  // Appearance
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const [saved, setSaved] = useState(false);

  if (!open) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'notifications', label: 'Bildirimler', icon: '🔔' },
    { id: 'privacy', label: 'Gizlilik', icon: '🔒' },
    { id: 'appearance', label: 'Görünüm', icon: '🎨' },
  ];

  return (
    <div className="settings-overlay">
      <style>{`
        .settings-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .settings-modal {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }
        
        .settings-header {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          padding: 20px 24px;
          color: white;
          position: relative;
          border-radius: 20px 20px 0 0;
        }
        .settings-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .close-btn:hover { background: rgba(255, 255, 255, 0.3); transform: rotate(90deg); }
        
        .settings-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .settings-nav {
          width: 140px;
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          padding: 12px 8px;
          flex-shrink: 0;
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .nav-item:hover { background: #e2e8f0; }
        .nav-item.active { background: #6366f1; color: white; }
        .nav-icon { font-size: 20px; }
        .nav-label { font-size: 11px; font-weight: 600; }
        
        .settings-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
        }
        .form-input:focus { border-color: #6366f1; }
        
        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .toggle-row:last-child { border-bottom: none; }
        .toggle-info h4 {
          margin: 0 0 2px 0;
          font-size: 14px;
          color: #1e293b;
        }
        .toggle-info p {
          margin: 0;
          font-size: 12px;
          color: #94a3b8;
        }
        
        .toggle-switch {
          width: 44px;
          height: 24px;
          background: #e2e8f0;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }
        .toggle-switch.active { background: #6366f1; }
        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .toggle-switch.active::after { left: 22px; }
        
        .option-cards {
          display: flex;
          gap: 10px;
        }
        .option-card {
          flex: 1;
          padding: 14px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .option-card:hover { border-color: #c7d2fe; }
        .option-card.active { border-color: #6366f1; background: #eef2ff; }
        .option-icon { font-size: 24px; margin-bottom: 6px; }
        .option-label { font-size: 12px; font-weight: 600; color: #475569; }
        .option-card.active .option-label { color: #6366f1; }
        
        .save-bar {
          padding: 16px 20px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-radius: 0 0 20px 20px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary {
          background: #e2e8f0;
          color: #475569;
        }
        .btn-secondary:hover { background: #cbd5e1; }
        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }
        
        .saved-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          animation: slideIn 0.3s ease;
          z-index: 1001;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <div className="settings-modal">
        <div className="settings-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>⚙️ Ayarlar</h2>
        </div>

        <div className="settings-body">
          <div className="settings-nav">
            {sections.map((sec) => (
              <div
                key={sec.id}
                className={`nav-item ${activeSection === sec.id ? 'active' : ''}`}
                onClick={() => setActiveSection(sec.id as typeof activeSection)}
              >
                <span className="nav-icon">{sec.icon}</span>
                <span className="nav-label">{sec.label}</span>
              </div>
            ))}
          </div>

          <div className="settings-content">
            {activeSection === 'profile' && (
              <>
                <h3 className="section-title">👤 Profil Bilgileri</h3>
                <div className="form-group">
                  <label className="form-label">Ad Soyad</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">E-posta</label>
                  <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                <h3 className="section-title">🔔 Bildirim Tercihleri</h3>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <h4>E-posta Bildirimleri</h4>
                    <p>Önemli güncellemeler için e-posta al</p>
                  </div>
                  <div className={`toggle-switch ${emailNotif ? 'active' : ''}`} onClick={() => setEmailNotif(!emailNotif)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <h4>SMS Bildirimleri</h4>
                    <p>Randevu hatırlatmaları için SMS al</p>
                  </div>
                  <div className={`toggle-switch ${smsNotif ? 'active' : ''}`} onClick={() => setSmsNotif(!smsNotif)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <h4>Push Bildirimleri</h4>
                    <p>Anlık bildirimler al</p>
                  </div>
                  <div className={`toggle-switch ${pushNotif ? 'active' : ''}`} onClick={() => setPushNotif(!pushNotif)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <h4>Egzersiz Hatırlatıcı</h4>
                    <p>Günlük egzersiz hatırlatması</p>
                  </div>
                  <div className={`toggle-switch ${reminderNotif ? 'active' : ''}`} onClick={() => setReminderNotif(!reminderNotif)} />
                </div>
              </>
            )}

            {activeSection === 'privacy' && (
              <>
                <h3 className="section-title">🔒 Gizlilik Ayarları</h3>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <h4>Profil Görünürlüğü</h4>
                    <p>Profilim diğer kullanıcılara görünsün</p>
                  </div>
                  <div className={`toggle-switch ${profileVisible ? 'active' : ''}`} onClick={() => setProfileVisible(!profileVisible)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <h4>İlerleme Paylaşımı</h4>
                    <p>Egzersiz ilerlememizi fizyoterapistle paylaş</p>
                  </div>
                  <div className={`toggle-switch ${shareProgress ? 'active' : ''}`} onClick={() => setShareProgress(!shareProgress)} />
                </div>
              </>
            )}

            {activeSection === 'appearance' && (
              <>
                <h3 className="section-title">🎨 Görünüm</h3>
                <div className="form-group">
                  <label className="form-label">Tema</label>
                  <div className="option-cards">
                    <div className={`option-card ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
                      <div className="option-icon">☀️</div>
                      <div className="option-label">Açık</div>
                    </div>
                    <div className={`option-card ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                      <div className="option-icon">🌙</div>
                      <div className="option-label">Koyu</div>
                    </div>
                    <div className={`option-card ${theme === 'auto' ? 'active' : ''}`} onClick={() => setTheme('auto')}>
                      <div className="option-icon">🔄</div>
                      <div className="option-label">Otomatik</div>
                    </div>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 20 }}>
                  <label className="form-label">Yazı Boyutu</label>
                  <div className="option-cards">
                    <div className={`option-card ${fontSize === 'small' ? 'active' : ''}`} onClick={() => setFontSize('small')}>
                      <div className="option-icon" style={{ fontSize: 16 }}>A</div>
                      <div className="option-label">Küçük</div>
                    </div>
                    <div className={`option-card ${fontSize === 'medium' ? 'active' : ''}`} onClick={() => setFontSize('medium')}>
                      <div className="option-icon" style={{ fontSize: 22 }}>A</div>
                      <div className="option-label">Orta</div>
                    </div>
                    <div className={`option-card ${fontSize === 'large' ? 'active' : ''}`} onClick={() => setFontSize('large')}>
                      <div className="option-icon" style={{ fontSize: 28 }}>A</div>
                      <div className="option-label">Büyük</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="save-bar">
          <button className="btn btn-secondary" onClick={onClose}>İptal</button>
          <button className="btn btn-primary" onClick={handleSave}>💾 Kaydet</button>
        </div>
      </div>

      {saved && (
        <div className="saved-toast">
          ✓ Ayarlar kaydedildi!
        </div>
      )}
    </div>
  );
};

export default SettingsModal;

