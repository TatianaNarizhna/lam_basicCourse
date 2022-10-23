import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'user',
      message: 'Pls, enter the user name or press ENTER to cancel:',
    },
    {
      type: 'list',
      name: 'gender',
      message: 'Pls, choose the gender:',
      choices: ['male', 'female'],
    },
    {
      type: 'input',
      name: 'age',
      message: 'Pls, enter the age:',
    },
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  });
