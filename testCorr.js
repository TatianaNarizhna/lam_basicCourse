import React, { useState } from 'react';
import s from './Form.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function FormElementData({ onSubmit, title }) {
  const [service, setService] = useState('');
  const [textField, setTextField] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [coments, setComents] = useState('');
  const [language, setLanguage] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    // const { value } = e.target;
    // console.log(e.target.value);

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

      default:
        break;
    }
  };

  const handleFileChange = e => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFileName(file.name);
      setFileContent(Number(reader.result.split(' ').join('').length));
    };
    reader.readAsText(file);
    reader.onerror = () => {
      console.log('file error', reader.error);
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    const language = e.currentTarget.value.split('-').pop();

    onSubmit({
      service,
      textField,
      email,
      name,
      coments,
      language,
      fileContent,
      fileName,
    });
    setLanguage(e.currentTarget.value);
  };

  return (
    <div>
      <h2 className={s.main_title}>{title}</h2>
      <form onSubmit={handleSubmit} className={s.main_form}>
        {/* <label htmlFor="service">Послуга</label>
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
        </datalist> */}

        <Box sx={{ width: 345 }} className={s.margin_select}>
          <FormControl fullWidth className={s.pad}>
            <InputLabel id="demo-simple-select-label">Послуга</InputLabel>
            <Select
              name="service"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={service}
              label="service"
              onChange={handleChange}
            >
              <MenuItem value={'Переклад'}>Переклад</MenuItem>
              <MenuItem value={'Редагування'}>Редагування</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className={s.area}>
          <textarea
            name="textField"
            value={textField}
            onChange={handleChange}
            className={s.area_text}
          ></textarea>

          {!textField && (
            <div className={s.area_download}>
              <span className={s.placeholder}>Введіть текст або </span>
              <label htmlFor="upload" className={s.labell} aria-hidden="true">
                завантажте файл
                <input
                  className={s.input}
                  name="fileContent"
                  type="file"
                  id="upload"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, .rtf, .txt, .pdf, .zip"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
          {fileContent && (
            <div className={s.area_file}>
              <p className={s.file_name}>{fileName}</p>
              <p className={s.file_length}>Кількість символів: {fileContent}</p>
              <p className={s.file_other}>завантажте файл</p>
            </div>
          )}
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
            <Box sx={{ width: 345 }} className={s.margin_select}>
              <FormControl fullWidth className={s.pad}>
                <InputLabel id="demo-simple-select-label">
                  Мовна пара
                </InputLabel>
                <Select
                  name="language"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label="language"
                  onChange={handleSubmit}
                >
                  {service === 'Редагування' ? (
                    <>
                      <MenuItem value={'Українська'}>Українська</MenuItem>
                      <MenuItem value={'Російська'}>Російська</MenuItem>
                      <MenuItem value={'Англійська'}>Англійська</MenuItem>
                      <MenuItem value={'Англійська(носій)'}>
                        Англійська(носій)
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value={'Українська/російська-Англійська'}>
                        Українська/російська-Англійська
                      </MenuItem>
                      <MenuItem value={'Англійська-Українська'}>
                        Англійська-Українська
                      </MenuItem>
                      <MenuItem value={'Англійська-Російська'}>
                        Англійська-Російська
                      </MenuItem>
                      <MenuItem value={'Російська-Українська'}>
                        Російська-Українська
                      </MenuItem>
                      <MenuItem value={'Українська-Російська'}>
                        Українська-Російська
                      </MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Box>
          </div>

          {/* <div>
            <label htmlFor="language">Мовна пара</label>
            <input
              list="languages"
              id="language"
              name="language"
              value={language}
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
                <option value="Українська/російська-Англійська" />
                <option value="Англійська-Українська" />
                <option value="Англійська-Російська" />
                <option value="Російська-Українська" />
                <option value="Українська-Російська" />
              </datalist>
            )}
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default FormElementData;
