import axios from 'axios';
import 'dotenv/config.js';

const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export const getCurrency = async (bot, id, choice) => {
  if (choice === 'back') {
    return;
  }

  const currency = await axios.get(url);
  const currList = currency.data;

  const result = currList.filter(item => item.ccy === choice)[0];

  let markUp = `
    *${result.ccy} => ${result.base_ccy}*
     Buy: _${Number(result.buy).toFixed(2)}_
     Sale: _${Number(result.sale).toFixed(2)}_
      `;
  bot.sendMessage(id, markUp, { parse_mode: 'Markdown' });

  return currency;
};
