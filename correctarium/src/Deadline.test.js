// import Deadline from './components/Deadline/Deadline.js';

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
  // console.log(startDayToEdit);
  startDayToEdit.setHours(startDayToEdit.getHours() + leftHours);
  startDayToEdit.setMinutes(startDayToEdit.getMinutes() + minRes);
  // console.log(startDayToEdit);

  if (getDay === 6 || getDay === 0) {
    return `Today is a weekend. It will be done on Monday and will take hours: ${hoursRes}, mins: ${minRes}`;
  }

  if (startTimeToEdit >= endWorkingHours) {
    startDayToEdit.setDate(getDate + daysForEdit);
    startDayToEdit.setHours(startWorkingHours + leftHours);
    startDayToEdit.setMinutes(startWorkingMinutes + minRes);
    // console.log('1');
  } else if (startTimeToEdit < startWorkingHours) {
    startDayToEdit.setHours(startWorkingHours + leftHours);
    startDayToEdit.setMinutes(startWorkingMinutes + minRes);
    // console.log('2');
  } else if (startTimeToEdit < endWorkingHours) {
    startDayToEdit.setHours(startTimeToEdit + leftHours);
    // console.log('3');
  }

  return startDayToEdit;
};

describe('dates', () => {
  test('countDates', () => {
    expect(deadlineCalculate(1, 30)).toBe(Date);
  });
});
