import React, { useState } from 'react';
import s from './FormOutputs.module.css';
import Modal from 'components/Modal/Modal';

const FormOutputs = ({ value, children }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  return (
    <div className={s.content__outputs}>
      <div className={s.close_button}>
        <button type="button" onClick={toggleModal}>
          open
        </button>
      </div>
      {modal && <Modal />}
      <div className={s.content__price}>
        <div className={s.number}>{value}</div>
        <p className={s.currency}>грн</p>
      </div>
      {children}
      <div className={s.button}>
        <button className={s.correctarium_button} type="submit" disabled>
          Ми тимчасово не приймаємо замовлення
        </button>
      </div>
    </div>
  );
};

export default FormOutputs;
