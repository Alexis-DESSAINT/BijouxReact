import React from 'react';
import './ModalAlert.css';

const ModalAlert = ({ open, message, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-alert-backdrop">
      <div className="modal-alert">
        <div className="modal-alert-message">{message}</div>
        <button className="modal-alert-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default ModalAlert;