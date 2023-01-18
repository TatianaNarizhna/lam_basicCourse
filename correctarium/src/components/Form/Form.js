import React, { useState } from 'react';
import s from './Form.module.css';

function FormElementData({ onSubmit }) {
  const [service, setService] = useState('');
  const [textField, setTextField] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [coments, setComents] = useState('');
  const [language, setLanguage] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'service':
        setService(value);
        break;

      case 'textField':
        setTextField(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'name':
        setName(value);
        break;

      case 'coments':
        setComents(value);
        break;

      // case 'language':
      //   setLanguage(value);
      //   break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const language = e.currentTarget.value;
    onSubmit({ service, textField, email, name, coments, language });
    setLanguage(e.currentTarget.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="service">Послуга</label>
        <input
          list="services"
          id="service"
          name="service"
          value={service}
          onChange={handleChange}
        />
        <datalist id="services">
          <option value="Переклад" />
          <option value="Редагування" />
        </datalist>

        <div>
          <label htmlFor="">
            {/* <input type="file" /> */}
            <textarea
              name="textField"
              id=""
              cols="40"
              rows="10"
              placeholder="Введіть текст або загрузіть файл "
              value={textField}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        <div className={s.area}>
          <textarea className={s.area_text}></textarea>
          <div className={s.area_download}>
            <span className={s.placeholder}>print or </span>
            <label htmlFor="" className={s.labell}>
              load file
              <input className={s.input} type="file" accept=".doc, .docx" />
            </label>
          </div>
        </div>

        <div>
          <div>
            {' '}
            <label htmlFor="">
              Ваша електронная почта
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="">
              Ваше ім'я
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="">
              Коментар або покликання
              <input
                type="text"
                name="coments"
                value={coments}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label htmlFor="language">Мова</label>
            <input
              list="languages"
              id="language"
              name="language"
              value={language}
              // onInput={e => {
              //   setLanguage(e.currentTarget.value);
              // }}
              onChange={handleSubmit}
            />
            {service === 'Редагування' ? (
              <datalist id="languages">
                <option value="Українська" />
                <option value="Російська" />
                <option value="Англійська" />
                <option value="Англійська(носій)" />
              </datalist>
            ) : (
              <datalist id="languages">
                <option value="Українська/російська - англ" />
                <option value="Англійська - українська" />
                <option value="Англійська - російська" />
                <option value="Російська - українська" />
                <option value="Українська - російська" />
              </datalist>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormElementData;
