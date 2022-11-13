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

function weatherMarkUp(request) {
  let date = new Date(request.dt_txt);
  let formatingDate = date.toLocaleDateString('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  let time = formatTime(date);
  let weather = `\n\n${formatingDate}:
   ${time}: +${Math.trunc(request.main.temp)}°C, ощущается как: +${Math.trunc(
    request.main.feels_like,
  )}°C, ${request.weather[0].description}.
`;
  return weather;
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
          str += element + ' ';
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

// ------------------------------------------------------------

// export default function getWeather(bot, id, choice) {
//   const responseApiService = axios
//     .get(
//       `${BASE_URL}lat=50.4333&lon=30.5167&lang=ru&units=metric&exclude=hourly,daily&appid=${API_KEY}`,
//     )
//     .then(response => {
//       const weatherList = response.data.list;
//       // let result = [];

//       weatherList.map(element => {
//         let date = new Date(element.dt_txt);
//         let hours = date.getHours();
//         // console.log(hours);

//         // const elementMarkUp = weatherMarkUp(element);
//         // result.push(elementMarkUp);

//         if (choice === 'interval of 3 hours') {
//           let result = [];
//           const elementMarkUp = weatherMarkUp(element);
//           result.push(elementMarkUp);

//           let str = '';
//           for (let index = 0; index < result.length; index++) {
//             const element = result[index];
//             str += element;
//             // str += element + ' ';
//           }
//           const finalStr = `Погода в Киеве: \n${str}`;

//           bot.sendMessage(id, finalStr);
//         }

//         if (choice === 'interval of 6 hours') {
//           let result = [];
//           const elementMarkUp = weatherMarkUp(element);
//           if (hours % 2 === 0) {
//             result.push(elementMarkUp);
//           }

//           let str = '';
//           for (let index = 0; index < result.length; index++) {
//             const element = result[index];
//             str += element;
//             // str += element + ' ';
//           }
//           const finalStr = `Погода в Киеве: \n${str}`;

//           bot.sendMessage(id, finalStr);
//         }
//       });
//     });

//   return responseApiService;
// }
