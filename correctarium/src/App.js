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
const fileFormat = [null, 'doc', 'docx', 'rtf'];

const deadlineTag = {};

export default function App() {
  const [userData, setUserData] = useState({});
  const [price, setPrice] = useState(0);

  const onFormDataReceive = data => {
    setUserData(data);
  };

  const { comments, language, service } = userData;

  useEffect(() => {}, []);

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
