import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import 'dotenv/config.js';

const apiKey = '4efb9521721d5ec27f0b2becfef0044d';

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\weather/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Weather forecast in Kyiv', {
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
