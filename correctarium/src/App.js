import React, { useState, useEffect } from 'react';
import Section from 'components/Section/Section';
import FormElement from 'components/Form/Form';
import PricingForm from 'components/PricingForm/PricingForm';

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

  console.log(userData);
  // const arr = userData.language;
  // console.log(arr);

  // зробити окремо usrEffect зі світч, а далі інший ефект або ф-я, яка буде рахувати!!!
  useEffect(() => {
    const { fileName, language, textField, fileContent } = userData;

    let priceOfOneSym;
    let minRate;
    switch (language) {
      case 'Українська':
        priceOfOneSym = priceTag.ukrLan;
        minRate = priceTag.minRateUkrRus;
        break;

      case 'Англійська':
        priceOfOneSym = priceTag.englLan;
        minRate = priceTag.minRateEngl;
        break;

      case 'Російська':
        priceOfOneSym = priceTag.rusLan;
        minRate = priceTag.minRateUkrRus;
        break;

      default:
        break;
    }

    console.log(priceOfOneSym);

    const handleCostChange = () => {};

    let ttlCost = textField * priceOfOneSym;

    // let ttlCost =
    //   textField !== 0
    //     ? Math.round(textField * priceOfOneSym)
    //     : Math.round(fileContent * priceOfOneSym);

    // const otherFilePrice =
    //   fileFormat.includes(fileName) === true
    //     ? ttlCost
    //     : ttlCost * priceTag.otherFile;

    ttlCost = ttlCost < minRate ? minRate : ttlCost;

    setPrice(ttlCost);
  }, [userData]);

  // console.log(fileFormat.includes(userData.fileName));
  // const onPriceCalculate = () => {};

  return (
    <>
      <Section title="Замовити переклад або редагування">
        <FormElement onSubmit={onFormDataReceive} />
        <PricingForm value={price} />
      </Section>
    </>
  );
}
