import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as OpenIcon } from 'icons/icons8-close.svg';
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
        <div className={s.modal_top}>
          <h3 className={s.second_title}>Скасувати замовлення?</h3>

          <IconButton onClick={onCloseBtn}>
            <OpenIcon width="18" height="18" className={s.button_close} />
          </IconButton>
        </div>

        <p className={s.content_text}>
          Закривши цю сторінку, ви скасуєте замовлення і зміни не збережуться.
          Ви впевнені?
        </p>

        <div className={s.buttons}>
          <button type="button" className={s.yes_button} onClick={onCloseBtn}>
            Так, скасувати
          </button>
          <button type="button" className={s.no_button} onClick={onCloseBtn}>
            Ні, залишитись
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
