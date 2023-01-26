import React from 'react';

const Deadline = ({ data }) => {
  const { textField, fileContent, language } = data;

  const languages = ['uk', 'en', 'ru'];
  const workHours = ['10:00:00', '19:00:00'];
  const deadlineTag = {};

  const fileFormat = ['null', 'doc', 'docx', 'rtf'];
  const editingUkrRusSign = 1333;
  const editingEngSign = 333;

  let now = new Date();

  const timeCalculate = () => {
    const hour = 1000 * 60 * 60;
    let getOneHour = parseInt((hour / (1000 * 60 * 60)) % 24);
    const halfAnHour = 0.5;

    let timeForWork;
    console.log(typeof textField);
    console.log(fileContent);
    console.log(language);
    console.log(editingEngSign);
    if (language === 'Англійська') {
      timeForWork = Number((textField / editingEngSign).toFixed(3));
    } else if (language === 'Українська' || language === 'Російська') {
      timeForWork = textField / editingUkrRusSign;
    }
    console.log(timeForWork);
    if (timeForWork < 1) {
      timeForWork = getOneHour;
    }

    let ttlTimeForWork = halfAnHour + timeForWork;

    return {
      needTimeForWork: ttlTimeForWork,
    };
  };

  console.log(timeCalculate());

  return <div></div>;
};

export default Deadline;

// let hour = 1000 * 60 * 60;
// let getOneHour = parseInt((hour / (1000 * 60 * 60)) % 24);
// const halfAnHour = 1000 * 60 * 30;
// let getHalfAnHour = parseInt((halfAnHour / (1000 * 60)) % 60);
