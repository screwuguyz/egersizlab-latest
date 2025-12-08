import React, { useState } from 'react';

interface SupportTicketModalProps {
  open: boolean;
  onClose: () => void;
}

type TicketCategory = 'technical' | 'payment' | 'exercise' | 'other';
type TicketPriority = 'low' | 'medium' | 'high';

interface Ticket {
  id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  message: string;
  status: 'open' | 'pending' | 'resolved';
  createdAt: Date;
}

const categoryLabels: Record<TicketCategory, { label: string; icon: string }> = {
  technical: { label: 'Teknik', icon: '🔧' },
  payment: { label: 'Ödeme', icon: '💳' },
  exercise: { label: 'Egzersiz', icon: '🏋️' },
  other: { label: 'Diğer', icon: '📝' },
};

const priorityLabels: Record<TicketPriority, { label: string; color: string }> = {
  low: { label: 'Düşük', color: '#22c55e' },
  medium: { label: 'Orta', color: '#f59e0b' },
  high: { label: 'Yüksek', color: '#ef4444' },
};

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Video oynatma sorunu',
    category: 'technical',
    priority: 'medium',
    message: 'Egzersiz videolarını oynatamıyorum.',
    status: 'pending',
    createdAt: new Date('2024-12-01'),
  },
  {
    id: 'TKT-002',
    subject: 'Paket yenileme',
    category: 'payment',
    priority: 'low',
    message: 'Paketimi nasıl yenileyebilirim?',
    status: 'resolved',
    createdAt: new Date('2024-11-28'),
  },
];

const SupportTicketModal: React.FC<SupportTicketModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TicketCategory>('technical');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tickets] = useState<Ticket[]>(mockTickets);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setSubject('');
      setMessage('');
      setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('history');
      }, 1500);
    }, 1000);
  };

  const getStatusBadge = (status: Ticket['status']) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      open: { bg: '#dbeafe', text: '#1d4ed8', label: 'Açık' },
      pending: { bg: '#fef3c7', text: '#b45309', label: 'İnceleniyor' },
      resolved: { bg: '#d1fae5', text: '#047857', label: 'Çözüldü' },
    };
    const style = styles[status];
    return (
      <span style={{ background: style.bg, color: style.text, padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
        {style.label}
      </span>
    );
  };

  return (
    <div className="support-modal-overlay">
      <style>{`
        .support-modal-overlay {
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
        
        .support-modal {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 580px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }
        
        .modal-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px 24px;
          color: white;
          position: relative;
          border-radius: 20px 20px 0 0;
        }
        .modal-header h2 {
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
        
        .tab-bar {
          display: flex;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .tab-btn {
          flex: 1;
          padding: 12px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .tab-btn:hover { color: #667eea; }
        .tab-btn.active { color: #667eea; background: white; }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #667eea;
        }
        
        .modal-content { padding: 20px 24px; }
        
        .form-row { display: flex; gap: 16px; margin-bottom: 16px; }
        .form-group { flex: 1; }
        .form-group.full { flex: none; width: 100%; margin-bottom: 16px; }
        
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
        }
        .form-label span { color: #ef4444; }
        
        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
        }
        .form-input:focus { border-color: #667eea; }
        .form-input::placeholder { color: #94a3b8; }
        textarea.form-input { min-height: 80px; resize: none; font-family: inherit; }
        
        .category-options { display: flex; gap: 10px; }
        .category-chip {
          flex: 1;
          padding: 12px 8px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .category-chip:hover { border-color: #c7d2fe; background: #f8fafc; }
        .category-chip.selected { border-color: #667eea; background: #eef2ff; }
        .cat-icon { font-size: 20px; }
        .cat-label { font-size: 11px; font-weight: 600; color: #64748b; }
        .category-chip.selected .cat-label { color: #667eea; }
        
        .submit-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .success-box {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
        }
        .success-box h3 { margin: 0; font-size: 18px; }
        
        .ticket-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 10px;
          transition: all 0.2s;
        }
        .ticket-item:hover { border-color: #c7d2fe; background: #fafafa; }
        .ticket-info h4 { margin: 0 0 4px 0; font-size: 14px; color: #1e293b; }
        .ticket-info p { margin: 0; font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 8px; }
        
        .empty-box { text-align: center; padding: 32px; color: #94a3b8; }
        .empty-box span { font-size: 40px; display: block; margin-bottom: 8px; }
      `}</style>

      <div className="support-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>🎟️ Destek Talebi</h2>
        </div>

        <div className="tab-bar">
          <button className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>
            ✨ Yeni Talep
          </button>
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            📋 Taleplerim ({tickets.length})
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'new' ? (
            showSuccess ? (
              <div className="success-box">
                <h3>✅ Talebiniz Alındı!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group full">
                  <label className="form-label">Konu <span>*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Sorununuzu kısaca özetleyin..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Kategori</label>
                  <div className="category-options">
                    {(Object.keys(categoryLabels) as TicketCategory[]).map((cat) => (
                      <div
                        key={cat}
                        className={`category-chip ${category === cat ? 'selected' : ''}`}
                        onClick={() => setCategory(cat)}
                      >
                        <span className="cat-icon">{categoryLabels[cat].icon}</span>
                        <span className="cat-label">{categoryLabels[cat].label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group full">
                  <label className="form-label">Mesaj <span>*</span></label>
                  <textarea
                    className="form-input"
                    placeholder="Detaylı açıklayın..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting || !subject || !message}>
                  {isSubmitting ? <><div className="spinner" /> Gönderiliyor...</> : <>📤 Gönder</>}
                </button>
              </form>
            )
          ) : (
            <div>
              {tickets.length === 0 ? (
                <div className="empty-box">
                  <span>📭</span>
                  <p>Henüz talebiniz yok</p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div key={ticket.id} className="ticket-item">
                    <div className="ticket-info">
                      <h4>{ticket.subject}</h4>
                      <p>
                        {categoryLabels[ticket.category].icon} {categoryLabels[ticket.category].label}
                        <span>•</span>
                        {ticket.createdAt.toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTicketModal;

