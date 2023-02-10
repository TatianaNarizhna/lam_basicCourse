import React from 'react';
import s from './FormOutputs.module.css';

const FormOutputs = ({ value, children }) => {
  return (
    <div className={s.content__outputs}>
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
