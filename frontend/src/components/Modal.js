// Modal.js

import React from "react";
import "./Modal.css"; // Modal 스타일링을 위한 CSS 파일을 불러옵니다.

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
