import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'user',
    message: 'Pls, enter the user name or press ENTER to cancel:',
    default: 'nnnnn',

    validate: answer => {
      if (answer === '') {
        return 'Pls, enter a valid name';
      }
      return true;
    },
    // when(answers) {
    //   return answers.user === '';
    // },
    when(answers) {
      answers.user === '';
    },
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Pls, choose the gender:',
    choices: ['male', 'female'],
    default: 'male',
  },
  {
    type: 'input',
    name: 'age',
    message: 'Pls, enter the age:',
    validate: answer => {
      if (isNaN(answer)) {
        return 'Pls, enter a valid age';
      }
      return true;
    },
  },
  // {
  //   type: 'confirm',
  //   name: 'fillAgain',
  //   message: 'Do you want another name or press Enter to cncl:',
  //   default: false,
  // },
];

// function ask() {
//   inquirer
//     .prompt(questions)

//     .then(answers => {
//       outPut.push(answers.user);
//       ask();

//       // console.log(outPut.join(' ,'));

//       //   if (answers.fillAgain) {

//       //   } else {
//       //     // console.log(JSON.stringify(answers, null, ' '));
//       //     // console.log(outPut.join(' ,'));
//       //   }
//       // console.log(answers);
//       console.log(JSON.stringify(answers, null, ' '));
//     });
// }

function ask() {
  inquirer
    .prompt(questions)

    .then(answers => {
      outPut.push(answers.user);
      ask();

      // console.log(outPut.join(' ,'));

      // if (answers.fillAgain) {
      //   ask();
      // } else {
      //   // console.log(JSON.stringify(answers, null, ' '));
      //   console.log(outPut.join(' ,'));
      // }
      // Use user feedback for... whatever!!
      // console.log(JSON.stringify(answers, null, ' '));
    });
}

ask();
// console.log(outPut);
