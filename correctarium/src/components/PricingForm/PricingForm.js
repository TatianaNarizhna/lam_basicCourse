import React from 'react';

const PricingForm = ({ price }) => {
  return (
    <div>
      <div>{price}</div>
      <p>грн</p>
    </div>
  );
};

export default PricingForm;
