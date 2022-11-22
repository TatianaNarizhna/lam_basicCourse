import axios from 'axios';
import 'dotenv/config.js';

const API_KEY = '';
const URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';

export const getCurrency = async (bot, id, choice) => {
  try {
    const currency = await axios.get(URL).then(response => {
      const currList = response.data;
      const result = currList.filter(item => item.ccy === choice)[0];
      let markUp = `
       *${result.ccy} => ${result.base_ccy}*
       Buy: _${result.buy}_
       Sale: _${result.sale}_
        `;
      bot.sendMessage(id, markUp, { parse_mode: 'Markdown' });
    });
    return currency;
  } catch (error) {
    console.error(error);
  }
};
