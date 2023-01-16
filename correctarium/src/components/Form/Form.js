import React, { useState, useEffect } from 'react';

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

      case 'language':
        setLanguage(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ service, textField, email, name, coments, language });
    // setLanguage(e.currentTarget.value);
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
          <textarea
            name="textField"
            id=""
            cols="40"
            rows="10"
            placeholder="Введіть текст або загрузіть файл "
            value={textField}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="">
            Ваша електронная почта
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="">
            Ваше ім'я
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="">
            Коментар або покликання
            <input
              type="text"
              name="coments"
              value={coments}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="language">Мовна пара</label>
          <input
            // type="submit"
            // eslint-disable-next-line no-sequences
            // onChange={handleChange}
            list="languages"
            id="language"
            name="language"
            value={language}
            onChange={handleChange}
            onInput={handleSubmit}
          />
          <datalist id="languages">
            <option value="Українська" />
            <option value="Російська" />
            <option value="Англійська" />
            <option value="Англійська(носій)" />
          </datalist>
        </div>
      </form>
    </div>
  );
}

export default FormElementData;
