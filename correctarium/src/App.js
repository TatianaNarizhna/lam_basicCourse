import React, { useState } from 'react';
import Section from 'components/Section/Section';
import FormElement from 'components/Form/Form';
import PricingForm from 'components/PricingForm/PricingForm';

export default function App() {
  const [userData, setUserData] = useState({});

  const onFormDataReceive = data => {
    setUserData(data);
  };

  const onPriceCalculate = () => {};

  return (
    <>
      <Section title="Замовити переклад або редагування">
        <FormElement onSubmit={onFormDataReceive} />
        <PricingForm price={onPriceCalculate} />
      </Section>
    </>
  );
}
