import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config.js';
import getWeather from './weatherApi';

// const API_KEY = '4efb9521721d5ec27f0b2becfef0044d';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

getWeather();

bot.onText(/\weather/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Weather forecast for a week', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'interval of 3 hours',
            callback_data: 'interval of 3 hours',
          },
          {
            text: 'interval of 6 hours',
            callback_data: 'interval of 6 hours',
          },
        ],
      ],
    },
  });
});

// bot.on('message', msg => {
//   const chatId = msg.chat.id;
//   let messageText = getWeather(msg.text);
//   console.log(messageText);
//   bot.sendMessage(chatId, messageText);
// });
