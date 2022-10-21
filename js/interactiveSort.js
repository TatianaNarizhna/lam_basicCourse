// import * as readline from 'node:readline/promises';
// const readline = require('readline');
// const fs = require('fs').promises;

import readline from 'readline';

const messageText = ` How do you want to sort them:
 1.Sort alphabetically.
 2.Sort numbers from smallest to largest.
 3.Sort numbers from largest to smallest.
 4.Sort words by quantity of letters.
 5.Sort only unique words.
 
 Select (1-5) and press ENTER:
 `;

let messageObj = {
  answerArr: '',
  alphabeticallySort() {
    const sorted = [...this.answerArr].sort((a, b) => a.localeCompare(b));
    return sorted;
  },
  smallerNumSort() {
    const numArr = this.answerArr.map(el => +el);
    return numArr.sort((a, b) => a - b);
  },
  biggerNumSort() {
    const numArr = this.answerArr.map(el => +el);
    return numArr.sort((a, b) => b - a);
  },
};

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rlInterface.question(
  'Please, enter a several words, dividing them in space:',
  userAnswer,
);

function userAnswer(data) {
  const dataTrim = data.trim();
  messageObj.answerArr = dataTrim.split(' ');
  console.log(messageObj.answerArr);

  rlInterface.setPrompt(messageText);
  rlInterface.prompt();

  rlInterface.on('line', userInput => {
    console.log(userInput);
    if (userInput.trim() === '1') {
      console.log(messageObj.alphabeticallySort());
    } else if (userInput.trim() === '2') {
      console.log(messageObj.smallerNumSort());
    } else if (userInput.trim() === '3') {
      console.log(messageObj.biggerNumSort());
    }
  });

  //   rlInterface.question(messageText);
}

// rlInterface.on('line', function (saying) {
//   if (saying.toLowerCase().trim() === 'exit') {
//     rlInterface.close();
//   } else {
//     rlInterface.on('line', userInput => {
//       console.log(userInput);
//       if (userInput.trim() === 1) {
//         console.log('bom');
//       }
//     });
//   }
// });

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
