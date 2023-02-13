import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseBtn }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseBtn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseBtn]);

  return createPortal(
    <div className={s.backdrop}>
      <div className={s.content}>
        <div>
          <h3>Скасувати замовлення?</h3>
        </div>
        <button type="button" onClick={onCloseBtn}>
          close
        </button>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
