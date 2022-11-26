import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config.js';
import { weatherByThree, weatherBySix } from './weatherApi.js';
import { getCurrency } from './valueApi.js';

// const API_KEY = '4efb9521721d5ec27f0b2becfef0044d';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Hi, pls press - /weather - in order to check weather forecast! or /currency - to check Exchange Rates`,
  );
});

bot.onText(/\/weather/, (msg, match) => {
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
          {
            text: 'back',
            callback_data: 'back',
          },
        ],
      ],
    },
  });
});

bot.onText(/\/currency/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Сurrency', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '$ - USD',
            callback_data: 'USD',
          },
          {
            text: '€ - EUR',
            callback_data: 'EUR',
          },
          {
            text: 'back',
            callback_data: 'back',
          },
        ],
      ],
    },
  });
});

bot.on('callback_query', query => {
  const id = query.message.chat.id;
  const choice = query.data;

  if (choice === 'back') {
    bot.sendMessage(
      id,
      `Hi, pls press - /weather - in order to check weather forecast! or /currency - to check Exchange Rates`,
    );
  }

  if (choice === 'interval of 3 hours') {
    weatherByThree(bot, id, choice);
  }
  if (choice === 'interval of 6 hours') {
    weatherBySix(bot, id, choice);
  }
  if (choice === 'USD' || 'EUR') {
    getCurrency(bot, id, choice);
  }
});
