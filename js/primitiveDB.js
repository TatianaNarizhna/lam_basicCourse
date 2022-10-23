import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'user',
    message: 'Pls, enter the user name or press ENTER to cancel:',
    validate: answer => {
      if (answer === '') {
        return 'Pls, enter a valid name';
      }
      return true;
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
      if (Number.isNaN(answer)) {
        return 'Pls, enter a valid age';
      }
      return true;
    },
  },
];

inquirer
  .prompt(questions)

  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  });
