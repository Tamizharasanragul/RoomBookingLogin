import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container-root">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={18} className="toast-icon-success" />;
        if (toast.type === 'error') {
          icon = <AlertCircle size={18} className="toast-icon-error" />;
        } else if (toast.type === 'info') {
          icon = <Info size={18} className="toast-icon-info" />;
        }

        return (
          <div key={toast.id} className={`toast-item glass-panel toast-${toast.type || 'success'} animate-fade-in`}>
            <div className="toast-icon-wrap">{icon}</div>
            <div className="toast-content">
              <strong>{toast.title}</strong>
              {toast.message && <p>{toast.message}</p>}
            </div>
            <button
              className="toast-close-btn"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
