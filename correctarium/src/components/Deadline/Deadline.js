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
    const halfAnHour30 = 1000 * 60 * 50;
    let getHalfAnHour = parseInt((halfAnHour30 / (1000 * 60)) % 60);

    const halfAnHour = 0.5;

    let ttlMs = hour + halfAnHour30;
    let ttlMin = parseInt((ttlMs / (1000 * 60)).toFixed(1));

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
      timeForWork = (textField / langForEdit).toFixed(2);
    } else if (fileContent) {
      timeForWork = (fileContent / langForEdit).toFixed(2);
    }

    let minutes = Number((timeForWork + '').split('.')[1]);
    let hours = Number.parseInt(timeForWork);
    timeForWork = hours;

    if (timeForWork < 1) {
      timeForWork = getOneHour;
      console.log('less one hour');
    }

    // let ttlTimeToNeed = halfAnHour + timeForWork;

    let ttlTimeToNeed = getHalfAnHour + minutes + timeForWork;
    let ttlMinRes = getHalfAnHour + minutes;
    if (ttlMinRes >= 60) {
      timeForWork += 1;
      ttlMinRes = ttlMinRes - 60;
    }
    console.log(ttlTimeToNeed);
    let calculation = deadlineCalculate(timeForWork, ttlMinRes);

    return {
      // needTimeForWork: ttlTimeToNeed.toLocaleString('en-GB'),
      needTimeForWork: `hours: ${timeForWork}, mins: ${ttlMinRes}`,
      deadline: calculation.toLocaleString('en-GB'),
    };
  };

  const deadlineCalculate = (hoursRes, minRes, time) => {
    let startDayToEdit = new Date();
    console.log(startDayToEdit);
    // let workingDays = startDayToEdit
    let startTimeToEdit = startDayToEdit.getHours();
    let getMinutes = startDayToEdit.getMinutes();

    let getDate = startDayToEdit.getDate();

    let getDay = startDayToEdit.getDay();

    const hoursPerDay = 9;
    const startWorkingHours = 10;
    const endWorkingHours = 19;
    let daysForEdit;

    daysForEdit =
      time / hoursPerDay >= 1 ? Number((time / hoursPerDay).toFixed(1)) : 0;

    let leftHours = time % hoursPerDay;
    let leftWorkingHours = endWorkingHours - startDayToEdit;
    // console.log(startTimeToEdit);
    console.log(leftHours.toFixed(2));

    startDayToEdit.setDate(startDayToEdit.getDate() + daysForEdit);
    startDayToEdit.setHours(startDayToEdit.getHours() + leftHours);

    if (startTimeToEdit >= endWorkingHours) {
      // leftHours = startTimeToEdit - endWorkingHours;
      startDayToEdit.setDate(getDate + 1);
      startDayToEdit.setHours(startWorkingHours + leftHours);
      console.log(leftHours);
      console.log('1');
    } else if (startTimeToEdit < startWorkingHours) {
      startDayToEdit.setHours(startWorkingHours + leftHours);
      console.log('2');
    } else if (startTimeToEdit < endWorkingHours) {
      startDayToEdit.setHours(startTimeToEdit + 5400000);
      console.log('3');
    } else if (leftWorkingHours < time) {
      startDayToEdit.setDate(getDate + 1);
      startDayToEdit.setHours(startWorkingHours + leftHours);
      console.log('4');
    }

    // if (startTimeToEdit > endWorkingHours) {
    // }

    // if (getDay >= 1 || getDay <= 5) {
    // }
    // console.log(startDayToEdit.getDate());

    return startDayToEdit;
  };

  // console.log(deadlineCalculate());
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
