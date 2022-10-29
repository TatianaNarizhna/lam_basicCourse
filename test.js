import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Write your name. To cancel press ENTER: ',
      name: 'name',
    },
    {
      type: 'input',
      message: 'write ur age: ',
      name: 'age',
      when(answers) {
        if (answers.name === '') {
          return answers.name;
        }
        return answers.name;
      },
    },
    {
      type: 'list',
      message: 'Choose ur gender: ',
      name: 'gender',
      choices: [
        {
          name: 'male',
        },
        {
          name: 'female',
        },
      ],
      when(answers) {
        return answers.name;
      },
    },
    {
      type: 'confirm',
      message: 'do you want to search?',
      name: 'search',
      when(answers) {
        return !answers.name;
      },
    },
  ])
  .then(answers => {});

// ------------
//   import inquirer from 'inquirer';
// import path from 'path';
// import * as fs from 'fs';

// const usersConfig = fs.existsSync('data.json');

// // console.log(process.cwd());

// const questions = [
//   {
//     type: 'input',
//     name: 'user',
//     message: 'Pls, enter the user name or press ENTER to cancel:',
//   },
//   {
//     type: 'list',
//     name: 'gender',
//     message: 'Pls, choose the gender:',
//     choices: ['male', 'female'],
//     default: 'male',
//     when(answers) {
//       if (answers.name === '') {
//         return answers.name;
//       }
//       return answers.name;
//     },
//   },
//   {
//     type: 'input',
//     name: 'age',
//     message: 'Pls, enter the age:',
//     // validate: answer => {
//     //   if (isNaN(answer)) {
//     //     return 'Pls, enter a valid age';
//     //   }
//     //   return true;
//     // },

//     when(answers) {
//       return answers.name;
//     },
//   },
// ];

// function ask() {
//   const data = {};
//   inquirer
//     .prompt(questions)

//     .then(answers => {
//       // outPut.push(answers.user);
//       ask();
//       // console.log(outPut.join(' ,'));
//       // if (answers.fillAgain) {
//       //   ask();
//       // } else {
//       //   // console.log(JSON.stringify(answers, null, ' '));
//       //   console.log(outPut.join(' ,'));
//       // }
//       // Use user feedback for... whatever!!
//       console.log(JSON.stringify(answers, null, ' '));
//     });
// }

// ask();
// console.log(outPut);
