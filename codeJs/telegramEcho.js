import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import 'dotenv/config.js';

const token = process.env.TOKEN;
const imgUrl = 'https://picsum.photos/200/300';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\photo/, (msg, match) => {
  const chatId = msg.chat.id;

  axios
    .get(imgUrl)
    .then(response => bot.sendPhoto(chatId, response.request.res.responseUrl));
});

bot.on('message', msg => {
  if (msg.text === 'photo') {
    console.log('User asked to send a picture');
  } else {
    console.log('User wrote:', msg.text);
  }
});
