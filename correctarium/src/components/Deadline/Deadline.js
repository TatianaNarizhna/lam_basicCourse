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
    const halfAnHour30 = 1000 * 60 * 30;
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

    let minutes =
      timeForWork < 1 ? 0 : Number((timeForWork + '').split('.')[1]);
    // console.log(timeForWork);
    // console.log(minutes);
    let hours = Number.parseInt(timeForWork);
    timeForWork = hours;

    if (timeForWork < 1) {
      timeForWork = getOneHour;
    }

    // let ttlTimeToNeed = halfAnHour + timeForWork;

    // let ttlTimeToNeed = getHalfAnHour + minutes + timeForWork;
    let ttlMinRes = getHalfAnHour + minutes;
    if (ttlMinRes >= 60) {
      timeForWork += 1;
      ttlMinRes = ttlMinRes - 60;
    }
    // console.log(ttlTimeToNeed);
    let calculation = deadlineCalculate(timeForWork, ttlMinRes);

    return {
      // needTimeForWork: ttlTimeToNeed.toLocaleString('en-GB'),
      needTimeForWork: `hours: ${timeForWork}, mins: ${ttlMinRes}`,
      deadline: calculation.toLocaleString('en-GB'),
    };
  };

  const deadlineCalculate = (hoursRes, minRes) => {
    let startDayToEdit = new Date();
    // console.log(startDayToEdit);
    // let workingDays = startDayToEdit
    let startTimeToEdit = startDayToEdit.getHours();
    // console.log(startTimeToEdit);
    let getMinutes = startDayToEdit.getMinutes();

    let getDate = startDayToEdit.getDate();

    let getDay = startDayToEdit.getDay();

    const hoursPerDay = 9;
    const startWorkingHours = 10;
    const startWorkingMinutes = 0;
    const endWorkingHours = 19;
    let daysForEdit;

    daysForEdit =
      hoursRes / hoursPerDay >= 1
        ? Math.round(Number(hoursRes / hoursPerDay))
        : 0;

    let leftHours = hoursRes % hoursPerDay;
    let leftWorkingHours = endWorkingHours - startDayToEdit;
    // console.log(startTimeToEdit);
    console.log(hoursRes);
    console.log(leftHours.toFixed(2));

    startDayToEdit.setDate(startDayToEdit.getDate() + daysForEdit);
    console.log(startDayToEdit);
    startDayToEdit.setHours(startDayToEdit.getHours() + leftHours);
    startDayToEdit.setMinutes(startDayToEdit.getMinutes() + minRes);
    console.log(startDayToEdit);

    if (startTimeToEdit >= endWorkingHours) {
      // leftHours = startTimeToEdit - endWorkingHours;
      console.log(daysForEdit);
      startDayToEdit.setDate(getDate + daysForEdit);
      startDayToEdit.setHours(startWorkingHours + leftHours);
      startDayToEdit.setMinutes(startWorkingMinutes + minRes);
      console.log('1');
    } else if (startTimeToEdit < startWorkingHours) {
      startDayToEdit.setHours(startWorkingHours + leftHours);
      startDayToEdit.setMinutes(startWorkingHours + minRes);
      console.log('2');
    } else if (startTimeToEdit < endWorkingHours) {
      startDayToEdit.setHours(startTimeToEdit + leftHours);
      startDayToEdit.setMinutes(startTimeToEdit + minRes);
      console.log('3');
    } else if (leftWorkingHours < hoursRes) {
      startDayToEdit.setDate(getDate + 1);
      startDayToEdit.setHours(startWorkingHours + leftHours);
      startDayToEdit.setMinutes(startWorkingHours + minRes);
      console.log('4');
    }

    // if (startTimeToEdit >= endWorkingHours) {
    //   // leftHours = startTimeToEdit - endWorkingHours;
    //   startDayToEdit.setDate(getDate + 1);
    //   startDayToEdit.setHours(startWorkingHours + leftHours);
    //   startDayToEdit.setMinutes(startWorkingHours + minRes);
    //   console.log(leftHours);
    //   console.log('1');
    // } else if (startTimeToEdit < startWorkingHours) {
    //   startDayToEdit.setHours(startWorkingHours + leftHours);
    //   startDayToEdit.setMinutes(startWorkingHours + minRes);
    //   console.log('2');
    // } else if (startTimeToEdit < endWorkingHours) {
    //   startDayToEdit.setHours(startTimeToEdit + leftHours);
    //   startDayToEdit.setMinutes(startTimeToEdit + minRes);
    //   console.log('3');
    // } else if (leftWorkingHours < hoursRes) {
    //   startDayToEdit.setDate(getDate + 1);
    //   startDayToEdit.setHours(startWorkingHours + leftHours);
    //   startDayToEdit.setMinutes(startWorkingHours + minRes);
    //   console.log('4');
    // }

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
