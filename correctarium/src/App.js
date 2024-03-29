import React, { useState, useEffect, useRef, useCallback } from 'react';
import Section from './components/Section/Section.js';
import FormElement from 'components/Form/Form';
import FormOutputs from 'components/FormOutputs/FormOutputs';
import Deadline from 'components/Deadline/Deadline';
import Footer from 'components/Footer/Footer';

const priceTag = {
  ukrLan: 0.05,
  rusLan: 0.05,
  englLan: 0.12,
  minRateUkrRus: 50,
  minRateEngl: 120,
  otherFile: 1.2,
};
const fileFormat = ['null', 'doc', 'docx', 'rtf'];

export default function App() {
  const [userData, setUserData] = useState({});
  const [price, setPrice] = useState(0);
  const [language, setLanguage] = useState('');

  const priceOfOneSym = useRef(0);
  const minRate = useRef(0);
  let lang = localStorage.getItem('lang');

  useEffect(() => {
    setLanguage(lang);
  }, [lang, userData]);

  const onFormDataReceive = data => {
    const formdataResult = {
      service: data.service,
      textField: data.textField.split(' ').join('').length,
      fileContent: data.fileContent,
      fileName: data.fileName.match(/\.([^.]+)$/)?.[1],
      language: lang,
    };
    setUserData(formdataResult);
  };

  // console.log(userData);

  const onTtlPriceCalculate = useCallback(() => {
    const { textField, fileContent, fileName } = userData;
    let ttlCost;

    if (fileFormat.includes(fileName)) {
      ttlCost = Math.ceil(fileContent * priceOfOneSym.current);
    } else if (textField !== 0) {
      ttlCost = Math.ceil(textField * priceOfOneSym.current);
    } else {
      ttlCost = Math.ceil(
        fileContent * priceOfOneSym.current * priceTag.otherFile,
      );
    }

    return (ttlCost = ttlCost < minRate.current ? minRate.current : ttlCost);
  }, [userData]);

  useEffect(() => {
    const { textField, fileContent } = userData;
    // console.log(textField);
    // console.log(language);
    switch (language) {
      case 'Українська':
        priceOfOneSym.current = priceTag.ukrLan;
        minRate.current = priceTag.minRateUkrRus;
        break;

      case 'Англійська':
        priceOfOneSym.current = priceTag.englLan;
        minRate.current = priceTag.minRateEngl;
        break;

      case 'Російська':
        priceOfOneSym.current = priceTag.rusLan;
        minRate.current = priceTag.minRateUkrRus;
        break;

      default:
        break;
    }

    if (textField || fileContent) {
      const total = onTtlPriceCalculate();
      setPrice(total);
    }
  }, [userData, price, onTtlPriceCalculate, language]);

  // useEffect(() => {
  //   const total = onTtlPriceCalculate();
  //   setPrice(total);
  // }, [onTtlPriceCalculate]);

  return (
    <>
      <Section>
        <FormElement
          onSubmit={onFormDataReceive}
          title="Замовити переклад або редагування"
        />
        <FormOutputs value={price}>
          <Deadline data={userData} price={price} language={language} />
        </FormOutputs>
      </Section>
      <Footer />
    </>
  );
}

// console.log(fileFormat);
// console.log(fileName);

// --------------------------------------------------------------------------
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Section from './components/Section/Section.js';
// import FormElement from 'components/Form/Form';
// import FormOutputs from 'components/FormOutputs/FormOutputs';
// import Deadline from 'components/Deadline/Deadline';
// import Footer from 'components/Footer/Footer';

// const priceTag = {
//   ukrLan: 0.05,
//   rusLan: 0.05,
//   englLan: 0.12,
//   minRateUkrRus: 50,
//   minRateEngl: 120,
//   otherFile: 1.2,
// };
// const fileFormat = ['null', 'doc', 'docx', 'rtf'];

// export default function App() {
//   const [userData, setUserData] = useState({});
//   const [price, setPrice] = useState(0);

//   const priceOfOneSym = useRef(0);
//   const minRate = useRef(0);

//   const onFormDataReceive = data => {
//     const formdataResult = {
//       service: data.service,
//       textField: data.textField.split(' ').join('').length,
//       fileContent: data.fileContent,
//       fileName: data.fileName.match(/\.([^.]+)$/)?.[1],
//       language: data.language,
//     };

//     setUserData(formdataResult);
//   };

//   const onTtlPriceCalculate = useCallback(() => {
//     const { textField, fileContent, fileName } = userData;

//     let ttlCost;

//     if (fileFormat.includes(fileName)) {
//       ttlCost = Math.ceil(fileContent * priceOfOneSym.current);
//     } else if (textField !== 0) {
//       ttlCost = Math.ceil(textField * priceOfOneSym.current);
//     } else {
//       ttlCost = Math.ceil(
//         fileContent * priceOfOneSym.current * priceTag.otherFile,
//       );
//     }

//     return (ttlCost = ttlCost < minRate.current ? minRate.current : ttlCost);
//   }, [userData]);

//   useEffect(() => {
//     const { language } = userData;

//     switch (language) {
//       case 'Українська':
//         priceOfOneSym.current = priceTag.ukrLan;
//         minRate.current = priceTag.minRateUkrRus;
//         break;

//       case 'Англійська':
//         priceOfOneSym.current = priceTag.englLan;
//         minRate.current = priceTag.minRateEngl;
//         break;

//       case 'Російська':
//         priceOfOneSym.current = priceTag.rusLan;
//         minRate.current = priceTag.minRateUkrRus;
//         break;

//       default:
//         break;
//     }

//     if (language) {
//       const total = onTtlPriceCalculate();
//       setPrice(total);
//     }
//   }, [userData, price, onTtlPriceCalculate]);

//   return (
//     <>
//       <Section>
//         <FormElement
//           onSubmit={onFormDataReceive}
//           title="Замовити переклад або редагування"
//         />
//         <FormOutputs value={price}>
//           <Deadline data={userData} />
//         </FormOutputs>
//       </Section>
//       <Footer />
//     </>
//   );
// }

// console.log(fileFormat);
// console.log(fileName);

// let ttlCost =
//   textField !== 0
//     ? Math.round(textField * priceOfOneSym.current)
//     : Math.round(fileContent * priceOfOneSym.current);

// const otherFilePrice =
//   fileFormat.includes(fileName) === true
//     ? ttlCost
//     : ttlCost * priceTag.otherFile;
