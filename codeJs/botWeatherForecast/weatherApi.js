import axios from 'axios';
import 'dotenv/config.js';

const API_KEY = '4efb9521721d5ec27f0b2becfef0044d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

export default function getWeather(bot, id, choice) {
  const response = axios.get(
    `${BASE_URL}lat=50.4333&lon=30.5167&lang=ru&units=metric&exclude=hourly,daily&appid=${API_KEY}`,
  );
  return response.list;
}
