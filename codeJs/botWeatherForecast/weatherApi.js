import axios from 'axios';
import 'dotenv/config.js';

const API_KEY = '4efb9521721d5ec27f0b2becfef0044d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

// let formatDate = date => {
//   let hour = date.getHours();
//   let minutes = date.getMinutes();

//   hour = hour < 10 ? '0' + hour : hour;
//   minutes = minutes < 10 ? '0' + minutes : minutes;

//   return `${hour}:${minutes}`;
// };

function weatherMarkUp(request) {
  let weather = `${request.dt_txt}:
  +${Math.trunc(request.main.temp)}°C, ощущается как: +${Math.trunc(
    request.main.feels_like,
  )}°C, ${request.weather[0].description}.
`;
  return weather;
}

export default function getWeather(bot, id, choice) {
  const responseApiService = axios
    .get(
      `${BASE_URL}lat=50.4333&lon=30.5167&lang=ru&units=metric&exclude=hourly,daily&appid=${API_KEY}`,
    )
    .then(response => {
      const weatherList = response.data.list;
      let result = [];

      weatherList.map(element => {
        // let date = new Date(element.dt);

        const elementMarkUp = weatherMarkUp(element);
        result.push(elementMarkUp);

        // str += `v ${date} temp ${element.main.temp}`;
      });
      if (choice === 'interval of 3 hours') {
        let str = '';
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          str += element;
          // str += element + ' ';
        }
        const finalStr = `Погода в Киеве: \n${str}`;

        bot.sendMessage(id, finalStr);
      }
      if (choice === 'interval of 6 hours') {
        let str = '';
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          str += element;
          // str += element + ' ';
        }
        const finalStr = `Погода в Киеве: \n${str}`;

        bot.sendMessage(id, finalStr);
      }
    });

  return responseApiService;
}
