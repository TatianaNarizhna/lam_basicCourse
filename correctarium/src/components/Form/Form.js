import React, { useState, useEffect } from 'react';
import s from './Form.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function FormElementData({ onSubmit, title }) {
  const [service, setService] = useState('');
  const [textField, setTextField] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [coments, setComents] = useState('');
  const [language, setLanguage] = useState('');
  // console.log(language);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    // if (name === 'language') {
    //   const language = e.target.value.split('-').pop();
    //   setLanguage(language);
    // }

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

      // case 'language':
      //   setLanguage(value);
      //   console.log(value);
      //   console.log(name);
      //   break;

      case 'coments':
        setComents(value);
        break;

      default:
        break;
    }

    handleDataChange(e);
    languageC(e);
  };

  const languageC = e => {
    if (e.target.name === 'language') {
      setLanguage(e.target.value);
      let langLocale = e.target.value.split('-').pop();
      localStorage.setItem('lang', langLocale);
    }
  };

  const handleDataChange = () => {
    const l = language;
    onSubmit({
      service,
      textField,
      email,
      name,
      coments,
      l,
      fileContent,
      fileName,
    });
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

  return (
    <div>
      <h2 className={s.main_title}>{title}</h2>
      <form className={s.main_form}>
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

        <div className={s.data_flex}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > :not(style)': { m: 1 },
            }}
          >
            <TextField
              sx={{
                width: 345,
              }}
              id="demo-helper-text-aligned-no-helper"
              label="Ваша електронная почта"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > :not(style)': { m: 1 },
            }}
          >
            <TextField
              sx={{
                width: 345,
              }}
              id="demo-helper-text-aligned-no-helper"
              label="Ваше ім'я"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > :not(style)': { m: 1 },
            }}
          >
            <TextField
              sx={{
                width: 345,
              }}
              id="demo-helper-text-aligned-no-helper"
              label="Коментар або покликання"
            />
          </Box>

          {service === 'Редагування' ? (
            <Box
              className={s.margin_select}
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
              }}
            >
              <FormControl sx={{ width: 345 }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Мовна пара
                </InputLabel>
                <Select
                  name="language"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label="language"
                  onChange={handleChange}
                >
                  <MenuItem value={'Українська'}>Українська</MenuItem>
                  <MenuItem value={'Російська'}>Російська</MenuItem>
                  <MenuItem value={'Англійська'}>Англійська</MenuItem>
                  <MenuItem value={'Англійська(носій)'}>
                    Англійська(носій)
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box className={s.margin_select}>
              <FormControl sx={{ width: 345 }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Мовна пара
                </InputLabel>
                <Select
                  name="language"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label="language"
                  onChange={handleChange}
                >
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
                </Select>
              </FormControl>
            </Box>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormElementData;

// --------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import s from './Form.module.css';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';

// function FormElementData({ onSubmit, title }) {
//   const [service, setService] = useState('');
//   const [textField, setTextField] = useState('');
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [coments, setComents] = useState('');
//   const [language, setLanguage] = useState('');
//   const [fileContent, setFileContent] = useState('');
//   const [fileName, setFileName] = useState('');

//   const handleChange = e => {
//     const { name, value } = e.target;

//     switch (name) {
//       case 'service':
//         setService(value);
//         break;

//       case 'textField':
//         setTextField(value);
//         break;

//       case 'email':
//         setEmail(value);
//         break;

//       case 'name':
//         setName(value);
//         break;

//       case 'coments':
//         setComents(value);
//         break;

//       default:
//         break;
//     }
//   };

//   const handleFileChange = e => {
//     const file = e.currentTarget.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       setFileName(file.name);
//       setFileContent(Number(reader.result.split(' ').join('').length));
//     };
//     reader.readAsText(file);
//     reader.onerror = () => {
//       console.log('file error', reader.error);
//     };
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     const language = e.target.value.split('-').pop();

//     onSubmit({
//       service,
//       textField,
//       email,
//       name,
//       coments,
//       language,
//       fileContent,
//       fileName,
//     });
//     setLanguage(e.target.value);
//   };

//   return (
//     <div>
//       <h2 className={s.main_title}>{title}</h2>
//       <form onSubmit={handleSubmit} className={s.main_form}>
//         <Box sx={{ width: 345 }} className={s.margin_select}>
//           <FormControl fullWidth className={s.pad}>
//             <InputLabel id="demo-simple-select-label">Послуга</InputLabel>
//             <Select
//               name="service"
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={service}
//               label="service"
//               onChange={handleChange}
//             >
//               <MenuItem value={'Переклад'}>Переклад</MenuItem>
//               <MenuItem value={'Редагування'}>Редагування</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <div className={s.area}>
//           <textarea
//             name="textField"
//             value={textField}
//             onChange={handleChange}
//             className={s.area_text}
//           ></textarea>

//           {!textField && (
//             <div className={s.area_download}>
//               <span className={s.placeholder}>Введіть текст або </span>
//               <label htmlFor="upload" className={s.labell} aria-hidden="true">
//                 завантажте файл
//                 <input
//                   className={s.input}
//                   name="fileContent"
//                   type="file"
//                   id="upload"
//                   accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, .rtf, .txt, .pdf, .zip"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             </div>
//           )}
//           {fileContent && (
//             <div className={s.area_file}>
//               <p className={s.file_name}>{fileName}</p>
//               <p className={s.file_length}>Кількість символів: {fileContent}</p>
//               <p className={s.file_other}>завантажте файл</p>
//             </div>
//           )}
//         </div>

//         <div className={s.data_flex}>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               '& > :not(style)': { m: 1 },
//             }}
//           >
//             <TextField
//               sx={{
//                 width: 345,
//               }}
//               id="demo-helper-text-aligned-no-helper"
//               label="Ваша електронная почта"
//             />
//           </Box>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               '& > :not(style)': { m: 1 },
//             }}
//           >
//             <TextField
//               sx={{
//                 width: 345,
//               }}
//               id="demo-helper-text-aligned-no-helper"
//               label="Ваше ім'я"
//             />
//           </Box>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               '& > :not(style)': { m: 1 },
//             }}
//           >
//             <TextField
//               sx={{
//                 width: 345,
//               }}
//               id="demo-helper-text-aligned-no-helper"
//               label="Коментар або покликання"
//             />
//           </Box>

//           {service === 'Редагування' ? (
//             <Box
//               className={s.margin_select}
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 '& > :not(style)': { m: 1 },
//               }}
//             >
//               <FormControl sx={{ width: 345 }} fullWidth>
//                 <InputLabel id="demo-simple-select-label">
//                   Мовна пара
//                 </InputLabel>
//                 <Select
//                   name="language"
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={language}
//                   label="language"
//                   onChange={handleSubmit}
//                 >
//                   <MenuItem value={'Українська'}>Українська</MenuItem>
//                   <MenuItem value={'Російська'}>Російська</MenuItem>
//                   <MenuItem value={'Англійська'}>Англійська</MenuItem>
//                   <MenuItem value={'Англійська(носій)'}>
//                     Англійська(носій)
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           ) : (
//             <Box className={s.margin_select}>
//               <FormControl sx={{ width: 345 }} fullWidth>
//                 <InputLabel id="demo-simple-select-label">
//                   Мовна пара
//                 </InputLabel>
//                 <Select
//                   name="language"
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={language}
//                   label="language"
//                   onChange={handleSubmit}
//                 >
//                   <MenuItem value={'Українська/російська-Англійська'}>
//                     Українська/російська-Англійська
//                   </MenuItem>
//                   <MenuItem value={'Англійська-Українська'}>
//                     Англійська-Українська
//                   </MenuItem>
//                   <MenuItem value={'Англійська-Російська'}>
//                     Англійська-Російська
//                   </MenuItem>
//                   <MenuItem value={'Російська-Українська'}>
//                     Російська-Українська
//                   </MenuItem>
//                   <MenuItem value={'Українська-Російська'}>
//                     Українська-Російська
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default FormElementData;
