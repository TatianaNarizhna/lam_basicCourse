import axios from 'axios';
import 'dotenv/config.js';

const URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export const getCurrency = async (bot, id, choice) => {
  if (choice === 'back' || 'interval of 3 hours' || 'interval of 6 hours') {
    return;
  }
  try {
    const currency = await axios.get(URL);
    const currList = await currency.data;

    const result = currList.filter(item => item.ccy === choice)[0];

    let markUp = `
      *${result.ccy} => ${result.base_ccy}*
       Buy: _${Number(result.buy).toFixed(2)}_
       Sale: _${Number(result.sale).toFixed(2)}_
        `;
    bot.sendMessage(id, markUp, { parse_mode: 'Markdown' });

    return currency;
  } catch (error) {
    console.error(error);
  }
};

//export const getCurrency = async (bot, id, choice) => {
//   try {
//     const currency = await axios.get(URL)
//     .then(response => {
//       const currList = response.data;
//       const result = currList.filter(item => item.ccy === choice)[0];
//       let markUp = `
//       *${result.ccy} => ${result.base_ccy}*
//        Buy: _${result.buy}_
//        Sale: _${result.sale}_
//         `;
//       bot.sendMessage(id, markUp, { parse_mode: 'Markdown' });
//     });
//     return currency;
//   } catch (error) {
//     console.error(error);
//   }
// };
