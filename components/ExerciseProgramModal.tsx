import React from 'react';

interface ExerciseProgramModalProps {
  open: boolean;
  onClose: () => void;
}

const exercises = [
  { id: 1, name: 'Boyun Germe', duration: '5 dk', icon: '🦴', status: 'todo' },
  { id: 2, name: 'Omuz Rotasyonu', duration: '3 dk', icon: '💪', status: 'todo' },
  { id: 3, name: 'Sırt Esneme', duration: '5 dk', icon: '🔙', status: 'done' },
  { id: 4, name: 'Bel Güçlendirme', duration: '8 dk', icon: '⬇️', status: 'todo' },
  { id: 5, name: 'Kalça Açma', duration: '4 dk', icon: '🦵', status: 'done' },
  { id: 6, name: 'Nefes Egzersizi', duration: '3 dk', icon: '🧘', status: 'todo' },
];

const ExerciseProgramModal: React.FC<ExerciseProgramModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const completedCount = exercises.filter(e => e.status === 'done').length;
  const progress = (completedCount / exercises.length) * 100;

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
          max-width: 500px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }
        
        .modal-header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 20px 24px;
          color: white;
          position: relative;
        }
        .modal-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px 0;
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
        
        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: white;
          border-radius: 3px;
          transition: width 0.3s;
        }
        .progress-text {
          font-size: 13px;
          margin-top: 6px;
          opacity: 0.9;
        }
        
        .modal-content {
          padding: 20px;
          max-height: 60vh;
          overflow-y: auto;
        }
        
        .exercise-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .exercise-item:hover { border-color: #10b981; background: #f0fdf4; }
        .exercise-item.done { border-color: #10b981; background: #ecfdf5; }
        
        .exercise-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .exercise-item.done .exercise-icon { background: #d1fae5; }
        
        .exercise-info { flex: 1; }
        .exercise-name { font-size: 15px; font-weight: 600; color: #1e293b; }
        .exercise-duration { font-size: 12px; color: #64748b; }
        
        .exercise-status {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .exercise-item.done .exercise-status { background: #10b981; color: white; }
        .exercise-item:not(.done) .exercise-status { background: #e2e8f0; color: #94a3b8; }
      `}</style>

      <div className="modal-box">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>🧘 Egzersiz Programım</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-text">{completedCount}/{exercises.length} tamamlandı</div>
        </div>

        <div className="modal-content">
          {exercises.map(ex => (
            <div key={ex.id} className={`exercise-item ${ex.status === 'done' ? 'done' : ''}`}>
              <div className="exercise-icon">{ex.icon}</div>
              <div className="exercise-info">
                <div className="exercise-name">{ex.name}</div>
                <div className="exercise-duration">⏱️ {ex.duration}</div>
              </div>
              <div className="exercise-status">
                {ex.status === 'done' ? '✓' : '▶'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseProgramModal;

