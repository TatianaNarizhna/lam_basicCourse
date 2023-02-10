import React, { useState, useEffect, useCallback } from 'react';
import s from './Deadline.module.css';

const Deadline = ({ data }) => {
  const { textField, fileContent, language } = data;

  const [deadline, setDeadline] = useState('');

  const editingUkrRusSign = 1333;
  const editingEngSign = 333;

  const timeCalculate = useCallback(() => {
    const hour = 1000 * 60 * 60;
    let getOneHour = parseInt((hour / (1000 * 60 * 60)) % 24);
    const halfAnHour30 = 1000 * 60 * 30;
    let getHalfAnHour = parseInt((halfAnHour30 / (1000 * 60)) % 60);

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

    let hourFinRes = Number.parseInt(timeForWork);
    timeForWork = hourFinRes;

    if (timeForWork < 1) {
      timeForWork = getOneHour;
    }

    let ttlMinRes = getHalfAnHour + minutes;
    if (ttlMinRes >= 60) {
      timeForWork += 1;
      ttlMinRes = ttlMinRes - 60;
    }

    const calculation = deadlineCalculate(timeForWork, ttlMinRes);

    return ` hours: ${timeForWork}, mins: ${ttlMinRes} \n Be ready: ${calculation.toLocaleString(
      'en-GB',
    )}`;
  }, [fileContent, language, textField]);

  const deadlineCalculate = (hoursRes, minRes) => {
    let startDayToEdit = new Date();
    let startTimeToEdit = startDayToEdit.getHours();
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

    startDayToEdit.setDate(startDayToEdit.getDate() + daysForEdit);
    console.log(startDayToEdit);
    startDayToEdit.setHours(startDayToEdit.getHours() + leftHours);
    startDayToEdit.setMinutes(startDayToEdit.getMinutes() + minRes);
    console.log(startDayToEdit);

    if (getDay === 6 || getDay === 0) {
      return `Today is a weekend. It will be done on Monday and will take hours: ${hoursRes}, mins: ${minRes}`;
    }

    if (startTimeToEdit >= endWorkingHours) {
      startDayToEdit.setDate(getDate + daysForEdit);
      startDayToEdit.setHours(startWorkingHours + leftHours);
      startDayToEdit.setMinutes(startWorkingMinutes + minRes);
      console.log('1');
    } else if (startTimeToEdit < startWorkingHours) {
      startDayToEdit.setHours(startWorkingHours + leftHours);
      startDayToEdit.setMinutes(startWorkingMinutes + minRes);
      console.log('2');
    } else if (startTimeToEdit < endWorkingHours) {
      startDayToEdit.setHours(startTimeToEdit + leftHours);
      console.log('3');
    }

    return startDayToEdit;
  };

  const finalRes = timeCalculate();

  useEffect(() => {
    setDeadline(finalRes);
  }, [finalRes]);

  // console.log(timeCalculate());

  console.log(finalRes);
  return <div className={s.line}>Need time: {language && deadline}</div>;
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
