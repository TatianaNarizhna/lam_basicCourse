import inquirer from 'inquirer';
import path from 'path';
import * as fs from 'fs';

const usersConfig = fs.existsSync('data.json');

// console.log(process.cwd());

const questions = [
  {
    type: 'input',
    message: 'Pls, enter the user name or press ENTER to cancel: ',
    name: 'name',
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Pls, choose the gender:',
    choices: ['male', 'female'],
    when(answers) {
      if (answers.name === '') {
        return answers.name;
      }
      return answers.name;
    },
  },
  {
    type: 'input',
    name: 'age',
    message: 'Pls, enter the age: ',

    when(answers) {
      return answers.name;
    },
  },
  {
    type: 'confirm',
    message: 'Do you want to find user in DB?',
    name: 'search',
    when(answers) {
      return !answers.name;
    },
  },
];

function ask() {
  const data = {};
  inquirer
    .prompt(questions)

    .then(answers => {
      // outPut.push(answers.user);
      ask();
      // console.log(outPut.join(' ,'));
      // if (answers.fillAgain) {
      //   ask();
      // } else {
      //   // console.log(JSON.stringify(answers, null, ' '));
      //   console.log(outPut.join(' ,'));
      // }
      // Use user feedback for... whatever!!
      console.log(JSON.stringify(answers, null, ' '));
    });
}

ask();
// console.log(outPut);
