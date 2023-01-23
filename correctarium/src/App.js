import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Section from 'components/Section/Section';
import FormElement from 'components/Form/Form';
import PricingForm from 'components/PricingForm/PricingForm';
import { number } from 'prop-types';

const languages = ['uk', 'en', 'ru'];

const priceTag = {
  ukrLan: 0.05,
  rusLan: 0.05,
  englLan: 0.12,
  minRateUkrRus: 50,
  minRateEngl: 120,
  otherFile: 1.2,
};

const workHours = ['10:00:00', '19:00:00'];
const fileFormat = ['null', 'doc', 'docx', 'rtf'];

const deadlineTag = {};

export default function App() {
  const [userData, setUserData] = useState({});
  const [price, setPrice] = useState(0);

  const priceOfOneSym = useRef(0);
  const minRate = useRef(0);

  const onFormDataReceive = data => {
    const formdataResult = {
      service: data.service,
      textField: data.textField.split(' ').join('').length,
      fileContent: data.fileContent,
      fileName: data.fileName.match(/\.([^.]+)$/)?.[1],
      language: data.language,
    };

    setUserData(formdataResult);
  };

  // console.log(userData);

  // let priceOfOneSym;
  // let minRate;
  useEffect(() => {
    const { fileName, language, textField, fileContent } = userData;

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

    if (language) {
      let ttlPrice = textField * priceOfOneSym.current;
      setPrice(ttlPrice);
    }
  }, [userData, price]);

  // -----------------
  // useEffect(() => {
  //   const { fileName, textField, fileContent } = userData;

  //   console.log(priceOfOneSym);

  //   let ttlCost = textField * priceOfOneSym;

  //   console.log(priceOfOneSym);
  //   let ttlCost =
  //     textField !== 0
  //       ? Math.round(textField * priceOfOneSym.current)
  //       : Math.round(fileContent * priceOfOneSym).current;

  //   const otherFilePrice =
  //     fileFormat.includes(fileName) === true
  //       ? ttlCost
  //       : ttlCost * priceTag.otherFile;

  //   ttlCost = ttlCost < minRate.current ? minRate.current : ttlCost;

  //   if (ttlCost === 'number') {
  //     setPrice(ttlCost);
  //   } else {
  //     setPrice(0);
  //   }
  //   console.log(ttlCost);
  // }, [userData, price]);

  return (
    <>
      <Section title="Замовити переклад або редагування">
        <FormElement onSubmit={onFormDataReceive} />
        <PricingForm value={price} />
      </Section>
    </>
  );
}
