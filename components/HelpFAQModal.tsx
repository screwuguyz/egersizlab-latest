import React, { useState } from 'react';

interface HelpFAQModalProps {
  open: boolean;
  onClose: () => void;
  onOpenSupport: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'exercise' | 'payment' | 'account';
}

const categories = {
  general: { label: 'Genel', icon: '📌' },
  exercise: { label: 'Egzersiz', icon: '🏋️' },
  payment: { label: 'Ödeme', icon: '💳' },
  account: { label: 'Hesap', icon: '👤' },
};

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'EgzersizLab nasıl çalışır?',
    answer: 'EgzersizLab, size özel egzersiz programları oluşturan dijital bir sağlık platformudur. Önce kısa bir değerlendirme yapılır, ardından uzman fizyoterapistlerimiz size özel bir program hazırlar.',
    category: 'general',
  },
  {
    id: '2',
    question: 'Egzersiz programım ne kadar sürede hazırlanır?',
    answer: 'Değerlendirmenizi tamamladıktan sonra egzersiz programınız 24-48 saat içinde hazırlanır ve size bildirim gönderilir.',
    category: 'exercise',
  },
  {
    id: '3',
    question: 'Egzersizleri günde kaç kez yapmalıyım?',
    answer: 'Bu, programınıza ve durumunuza göre değişir. Genellikle günde 1-2 seans önerilir. Detaylar programınızda belirtilecektir.',
    category: 'exercise',
  },
  {
    id: '4',
    question: 'Ödeme yöntemleri nelerdir?',
    answer: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeler 256-bit SSL ile güvence altındadır.',
    category: 'payment',
  },
  {
    id: '5',
    question: 'İptal ve iade politikası nedir?',
    answer: 'Satın alma tarihinden itibaren 14 gün içinde, program başlamadıysa tam iade yapılır. Detaylar için destek ekibimize ulaşabilirsiniz.',
    category: 'payment',
  },
  {
    id: '6',
    question: 'Şifremi nasıl değiştirebilirim?',
    answer: 'Profil menüsünden "Şifre Değiştir" seçeneğine tıklayarak şifrenizi güncelleyebilirsiniz.',
    category: 'account',
  },
  {
    id: '7',
    question: 'Fizyoterapistle nasıl iletişime geçebilirim?',
    answer: 'Premium paket kullanıcıları "Fizyoterapiste Sor" özelliğini kullanabilir. Diğer kullanıcılar destek talebi oluşturabilir.',
    category: 'general',
  },
  {
    id: '8',
    question: 'Egzersiz videolarını indirebilir miyim?',
    answer: 'Şu an için videolar yalnızca çevrimiçi izlenebilmektedir. Offline erişim özelliği yakında eklenecektir.',
    category: 'exercise',
  },
];

const HelpFAQModal: React.FC<HelpFAQModalProps> = ({ open, onClose, onOpenSupport }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!open) return null;

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-overlay">
      <style>{`
        .faq-overlay {
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
        
        .faq-modal {
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
        
        .faq-header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 20px 24px;
          color: white;
          position: relative;
          border-radius: 20px 20px 0 0;
        }
        .faq-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .faq-header p {
          margin: 0;
          font-size: 13px;
          opacity: 0.9;
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
        
        .search-box {
          padding: 16px 20px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E") 12px center no-repeat;
          background-size: 18px;
        }
        .search-input:focus { border-color: #10b981; }
        .search-input::placeholder { color: #94a3b8; }
        
        .category-tabs {
          display: flex;
          gap: 6px;
          padding: 12px 20px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          overflow-x: auto;
        }
        .cat-tab {
          padding: 8px 14px;
          border: none;
          border-radius: 20px;
          background: #f1f5f9;
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cat-tab:hover { background: #e2e8f0; }
        .cat-tab.active { background: #10b981; color: white; }
        
        .faq-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
        }
        
        .faq-item {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 10px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .faq-item:hover { border-color: #c7d2fe; }
        .faq-item.expanded { border-color: #10b981; }
        
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #fff;
          cursor: pointer;
          gap: 12px;
        }
        .faq-question:hover { background: #f8fafc; }
        .faq-item.expanded .faq-question { background: #f0fdf4; }
        
        .q-text {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .q-icon {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }
        .faq-item.expanded .q-icon { background: #10b981; color: white; }
        
        .expand-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          flex-shrink: 0;
          font-size: 14px;
          color: #64748b;
        }
        .faq-item.expanded .expand-icon { transform: rotate(180deg); background: #10b981; color: white; }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .faq-item.expanded .faq-answer { max-height: 200px; }
        
        .answer-content {
          padding: 0 16px 16px 50px;
          font-size: 13px;
          line-height: 1.6;
          color: #475569;
        }
        
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #94a3b8;
        }
        .no-results span { font-size: 40px; display: block; margin-bottom: 12px; }
        .no-results p { margin: 0; font-size: 14px; }
        
        .help-footer {
          padding: 16px 20px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-radius: 0 0 20px 20px;
          text-align: center;
        }
        .help-footer p {
          margin: 0 0 10px 0;
          font-size: 13px;
          color: #64748b;
        }
        .contact-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .contact-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); }
      `}</style>

      <div className="faq-modal">
        <div className="faq-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>❓ Yardım / SSS</h2>
          <p>Sık sorulan sorular ve cevapları</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Soru ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          <button
            className={`cat-tab ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            📋 Tümü
          </button>
          {Object.entries(categories).map(([key, { label, icon }]) => (
            <button
              key={key}
              className={`cat-tab ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="faq-content">
          {filteredFAQs.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <p>Sonuç bulunamadı</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${expandedId === faq.id ? 'expanded' : ''}`}
              >
                <div className="faq-question" onClick={() => toggleExpand(faq.id)}>
                  <span className="q-text">
                    <span className="q-icon">{categories[faq.category].icon}</span>
                    {faq.question}
                  </span>
                  <span className="expand-icon">▼</span>
                </div>
                <div className="faq-answer">
                  <div className="answer-content">{faq.answer}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="help-footer">
          <p>Aradığınızı bulamadınız mı?</p>
          <button className="contact-btn" onClick={() => { onClose(); onOpenSupport(); }}>
            🎟️ Destek Talebi Oluştur
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQModal;

