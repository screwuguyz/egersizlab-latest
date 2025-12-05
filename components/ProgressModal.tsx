import React from 'react';

interface ProgressModalProps {
  open: boolean;
  onClose: () => void;
}

const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const weekData = [
  { day: 'Pzt', done: true },
  { day: 'Sal', done: true },
  { day: 'Çar', done: false },
  { day: 'Per', done: true },
  { day: 'Cum', done: false },
  { day: 'Cmt', done: false, today: true },
  { day: 'Paz', done: false },
];

const stats = [
  { label: 'Toplam Gün', value: '12', icon: '📅' },
  { label: 'Seri', value: '3', icon: '🔥' },
  { label: 'Egzersiz', value: '45', icon: '🏋️' },
  { label: 'Dakika', value: '180', icon: '⏱️' },
];

const ProgressModal: React.FC<ProgressModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <style>{`
        .modal-overlay {
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
        
        .modal-box {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }
        
        .modal-header {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          padding: 20px 24px;
          color: white;
          position: relative;
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
          transition: all 0.2s;
        }
        .close-btn:hover { background: rgba(255, 255, 255, 0.3); }
        
        .modal-content {
          padding: 20px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .stat-card {
          text-align: center;
          padding: 12px 8px;
          background: #f8fafc;
          border-radius: 12px;
        }
        .stat-icon { font-size: 20px; margin-bottom: 4px; }
        .stat-value { font-size: 20px; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 10px; color: #64748b; }
        
        .week-section h3 {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 12px 0;
        }
        .week-grid {
          display: flex;
          gap: 8px;
        }
        .day-item {
          flex: 1;
          text-align: center;
          padding: 12px 8px;
          border-radius: 12px;
          background: #f1f5f9;
          transition: all 0.2s;
        }
        .day-item.done { background: #d1fae5; }
        .day-item.today { border: 2px solid #6366f1; background: #eef2ff; }
        .day-name { font-size: 11px; color: #64748b; margin-bottom: 6px; }
        .day-status { font-size: 18px; }
        
        .motivation {
          margin-top: 20px;
          padding: 16px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border-radius: 12px;
          text-align: center;
        }
        .motivation-text {
          font-size: 14px;
          color: #92400e;
          font-weight: 600;
        }
      `}</style>

      <div className="modal-box">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>📅 Takvim / İlerleme</h2>
        </div>

        <div className="modal-content">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="week-section">
            <h3>Bu Hafta</h3>
            <div className="week-grid">
              {weekData.map((d, i) => (
                <div key={i} className={`day-item ${d.done ? 'done' : ''} ${d.today ? 'today' : ''}`}>
                  <div className="day-name">{d.day}</div>
                  <div className="day-status">
                    {d.done ? '✅' : d.today ? '📍' : '⚪'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="motivation">
            <div className="motivation-text">🔥 3 günlük serin var! Devam et!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;

