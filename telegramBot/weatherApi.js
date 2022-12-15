import axios from 'axios';
import 'dotenv/config.js';

const API_KEY = '4efb9521721d5ec27f0b2becfef0044d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

let formatTime = date => {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hour}:${minutes}`;
};

//---------Variant1-------
// function weatherMarkUp(request) {
//   let date = new Date(request.dt_txt);
//   //   const date1 = request.dt_txt.split(" ");

//   let formatingDate = date.toLocaleDateString('ru', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//   });

//   let time = formatTime(date);
//   let weather = `\n${formatingDate}:
//    ${time}: +${Math.trunc(request.main.temp)}°C, ощущается как: +${Math.trunc(
//     request.main.feels_like,
//   )}°C,${request.weather[0].description}.
// `;
//   return weather;
// }

const dayOfWeek = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятниця',
  'Суббота',
];

const month = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

//---------Variant1-------
function weatherMarkUp(request) {
  let date2 = new Date(request.dt_txt);

  const markUp = [request].reduce((acc, { main, dt_txt, weather }) => {
    const forecastDate = dt_txt.split(' ');
    const time = formatTime(date2);

    const date = new Date(dt_txt);
    const frcstDayWeek = dayOfWeek[date.getDay()];

    const frcstMonth = month[date.getMonth()];
    const frcstNumberDay = forecastDate[0].split('-').pop();
    const temperature = Math.trunc(main.temp);
    const tempFeels = Math.trunc(main.feels_like);

    const forecastPerDay = `\n ${time}, ${temperature}, ощущается как: +${tempFeels}°C, ${weather[0].description}  `;

    // if (acc.hasOwnProperty({ dt_txt })) {
    //   acc.push({
    //     weather: [forecastPerDay],
    //   });
    // }

    acc.push({
      dayDetails: `${frcstDayWeek}, ${frcstNumberDay} ${frcstMonth}`,
      weather: [forecastPerDay],
    });

    return acc;
  }, []);

  return `\n${markUp.map(
    ({ dayDetails, weather }) => `\n${dayDetails} ${weather}`,

    //  const dateStr = parseInt(dayDetails.match(/\d+/));

    // if (dateStr !== date2.getDate()) {
    //   return `\n${dayDetails} ${weather}`;
    // } else {
    //   return `${weather}`;
    // }
  )}`;
}

export const weatherByThree = async (bot, id) => {
  try {
    const threeHours = await axios
      .get(
        `${BASE_URL}lat=50.4333&lon=30.5167&lang=ru&units=metric&exclude=hourly,daily&appid=${API_KEY}`,
      )
      .then(response => {
        const weatherList = response.data.list;

        let result = [];

        weatherList.map(element => {
          const elementMarkUp = weatherMarkUp(element);

          result.push(elementMarkUp);
        });
        let str = '';
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          str += element;
        }
        const finalStr = `Погода в Киеве: \n${str}`;

        bot.sendMessage(id, finalStr);
      });
    return threeHours;
  } catch (error) {
    console.error(error);
  }
};

export const weatherBySix = async (bot, id) => {
  try {
    const threeHours = await axios
      .get(
        `${BASE_URL}lat=50.4333&lon=30.5167&lang=ru&units=metric&exclude=hourly,daily&appid=${API_KEY}`,
      )
      .then(response => {
        const weatherList = response.data.list;
        let result = [];

        weatherList.map(element => {
          let date = new Date(element.dt_txt);
          let hours = date.getHours();

          if (hours % 2 === 0) {
            const elementMarkUp = weatherMarkUp(element);
            result.push(elementMarkUp);
          }
        });
        let str = '';
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          str += element;
        }
        const finalStr = `Погода в Киеве: \n${str}`;

        bot.sendMessage(id, finalStr);
      });
    return threeHours;
  } catch (error) {
    console.error(error);
  }
};
