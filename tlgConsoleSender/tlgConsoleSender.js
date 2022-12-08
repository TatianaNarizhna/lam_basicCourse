import { program } from 'commander';
import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config.js';

const token = process.env.TOKEN;
const id = process.env.ID;

const bot = new TelegramBot(token, { polling: false });

program.version('0.0.1');

program
  .command('message')
  .description('enter some message')
  .alias('m')
  .argument('<message>')
  .action(function (msg) {
    bot.sendMessage(id, msg);
  });

program
  .command('picture')
  .description('send some picture')
  .alias('p')
  .argument('<path>')
  .action(function (pic) {
    bot.sendPhoto(id, pic);
  });

program
  .option('-m, --message', 'to send a message')
  .option('-p, --picture', 'to send a picture')
  .action(task => {
    console.log(`${task}`);
  });

program.parse(process.argv);
