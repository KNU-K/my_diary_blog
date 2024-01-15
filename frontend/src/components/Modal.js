// Modal.js

import React from "react";
import "./Modal.css"; // Modal ��Ÿ�ϸ��� ���� CSS ������ �ҷ��ɴϴ�.

const Modal = ({ closeModal, children }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
