import React, { useState, useEffect, useRef, useCallback } from 'react';
import Section from 'components/Section/Section';
import FormElement from 'components/Form/Form';
import PricingForm from 'components/PricingForm/PricingForm';
import Deadline from 'components/Deadline/Deadline';

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

    return (ttlCost = ttlCost < minRate.current ? minRate.current : ttlCost);
  }, [userData]);

  useEffect(() => {
    const { language } = userData;

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
      const total = onTtlPriceCalculate();
      setPrice(total);
    }
  }, [userData, price, onTtlPriceCalculate]);

  return (
    <>
      <Section title="Замовити переклад або редагування">
        <FormElement onSubmit={onFormDataReceive} />
        <PricingForm value={price} />
        <Deadline data={userData} />
      </Section>
    </>
  );
}
