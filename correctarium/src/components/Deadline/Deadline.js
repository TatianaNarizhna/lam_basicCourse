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
    let langForEdit;

    switch (language) {
      case 'Англійська':
        langForEdit = editingEngSign;
        break;

      case 'Українська':
        langForEdit = editingUkrRusSign;
        break;

      case 'Російська':
        langForEdit = editingUkrRusSign;
        break;

      default:
        break;
    }

    if (textField) {
      timeForWork = textField / langForEdit;
    } else if (fileContent) {
      timeForWork = fileContent / langForEdit;
    }

    if (timeForWork < 1) {
      timeForWork = getOneHour;
    }

    let ttlTimeToNeed = halfAnHour + timeForWork;
    let calculation = deadlineCalculate(ttlTimeToNeed);

    return {
      needTimeForWork: ttlTimeToNeed,
    };
  };

  const deadlineCalculate = time => {
    let startDayToEdit = new Date();
    // let workingDays = startDayToEdit
    let startTimeToEdit = startDayToEdit.getHours();
    let getDate = startDayToEdit.getDate();
    let getDay = startDayToEdit.getDay();

    const hoursPerDay = 9;
    const startWorkingHours = 10;
    const endWorkingHours = 19;
    let daysForEdit;

    daysForEdit =
      time / hoursPerDay >= 1 ? Number((time / hoursPerDay).toFixed(1)) : 0;

    let leftHours = time % hoursPerDay;

    startDayToEdit.setDate(startDayToEdit.getDate() + daysForEdit);
    startDayToEdit.setHours(startDayToEdit.getHours() + leftHours);

    if (startTimeToEdit >= endWorkingHours) {
      leftHours = startTimeToEdit - endWorkingHours;
      startDayToEdit.setDate(getDate + 1);
      startDayToEdit.setHours(startWorkingHours + leftHours);
    } else if (startTimeToEdit < startWorkingHours) {
      startDayToEdit.setHours(startWorkingHours + leftHours);
    }

    // if (startTimeToEdit > endWorkingHours) {
    // }

    // if (getDay >= 1 || getDay <= 5) {
    // }
    console.log(startDayToEdit.getDate());
  };

  console.log(deadlineCalculate());
  console.log(timeCalculate());

  return <div></div>;
};

export default Deadline;

// let hour = 1000 * 60 * 60;
// let getOneHour = parseInt((hour / (1000 * 60 * 60)) % 24);
// const halfAnHour = 1000 * 60 * 30;
// let getHalfAnHour = parseInt((halfAnHour / (1000 * 60)) % 60);

// if (language === 'Англійська') {
//   timeForWork = Number((textField / editingEngSign).toFixed(3));
// } else if (language === 'Українська' || language === 'Російська') {
//   timeForWork = textField / editingUkrRusSign;
// }
