// import * as readline from 'node:readline/promises';
// const readline = require('readline');
// const fs = require('fs').promises;

import readline from 'readline';

let answerArr = [];

const messageObj = {
  1: 'Sort alphabetically',
  2: 'Sort numbers from smallest to largest',
  3: 'Sort numbers from largest to smallest',
  4: 'Sort words by quantity of letters',
  5: 'Sort only unique words',
};

const messageText = ` How do you want to sort them:
 1.Sort alphabetically.
 2.Sort numbers from smallest to largest.
 3.Sort numbers from largest to smallest.
 4.Sort words by quantity of letters.
 5.Sort only unique words.
 
 Select (1-5) and press ENTER:
 `;

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rlInterface.question(
  'Please, enter a several words, dividing them in space:',
  userAnswer,
);

function userAnswer(data) {
  //   console.log('How do you want to sort them?');
  answerArr.push(data.trim());
  console.log(answerArr);

  rlInterface.setPrompt(messageText);
  rlInterface.prompt();

  //   rlInterface.question(messageText);

  rlInterface.on('line', function (saying) {
    if (saying.toLowerCase().trim() === 'exit') {
      rlInterface.close();
    } else {
      rlInterface.on('line', userInput => {
        if (userInput.trim() === 1) {
          console.log('bom');
        }
      });
    }
  });
}

rlInterface.on('close', () => {
  console.log('Good bye');
});

// 'How do you want to sort them?'

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question('какое у вас время (в часах)?', time => {
//   if (time >= 6 && time < 12) {
//     console.log('Доброе утро');
//   } else if (time >= 12 && time < 18) {
//     console.log('Добрый день');
//   } else {
//     console.log('Добрый вечер');
//   }

//   readline.close();
// });
