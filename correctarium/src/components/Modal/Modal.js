import React from 'react';
import s from './Modal.module.css';

const Modal = () => {
  return (
    <div className={s.backdrop}>
      <div className={s.content}>
        <div>
          <h3>Скасувати замовлення?</h3>
        </div>
      </div>
    </div>
  );
};

export default Modal;
