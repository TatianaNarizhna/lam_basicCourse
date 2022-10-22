import readline from 'readline';

const messageText = ` How do you want to sort them:
 1.Sort alphabetically.
 2.Sort numbers from smallest to largest.
 3.Sort numbers from largest to smallest.
 4.Sort words by quantity of letters.
 5.Sort only unique words.
 6.Show only unique values from all input.
 
 Select (1-5) and press ENTER:
 `;

const messageObj = {
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
  lettersSort() {
    const sorted = [...this.answerArr];

    for (let j = 0; j < sorted.length; j++) {
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i].length > sorted[i + 1].length) {
          let temp = sorted[i];
          sorted[i] = sorted[i + 1];
          sorted[i + 1] = temp;
        }
      }
    }
    return sorted;
  },

  uniqueSort() {
    return this.answerArr.filter((el, index, arr) => arr.indexOf(el) === index);
  },

  showUnique() {
    const copy = [...this.answerArr];
    const sorted = new Set(copy);
    return [...sorted];
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

  rlInterface.setPrompt(messageText);
  rlInterface.prompt();

  rlInterface.on('line', userInput => {
    if (userInput.trim() === '1') {
      console.log(messageObj.alphabeticallySort());
    } else if (userInput.trim() === '2') {
      console.log(messageObj.smallerNumSort());
    } else if (userInput.trim() === '3') {
      console.log(messageObj.biggerNumSort());
    } else if (userInput.trim() === '4') {
      console.log(messageObj.lettersSort());
    } else if (userInput.trim() === '5') {
      console.log(messageObj.uniqueSort());
    } else if (userInput.trim() === '6') {
      console.log(messageObj.showUnique());
    } else if (userInput.toLowerCase().trim() === 'exit') {
      rlInterface.close();
    } else {
      rlInterface.question(
        'Please, enter a several words, dividing them in space:',
        userAnswer,
      );
    }
  });
}

rlInterface.on('close', () => {
  console.log('Good bye');
});

// rlInterface.on('line', function (saying) {
//   if (saying.toLowerCase().trim() === 'exit') {
//     rlInterface.close();
//   }
// });
