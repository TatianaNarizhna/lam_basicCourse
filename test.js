import inquirer from 'inquirer';
import fs from 'fs/promises';
const { rawListeners } = require('process');
const fileRead = fs.readFileSync('file.txt', 'utf8');

function askForINfo() {
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
      {
        type: 'input',
        message: 'Enter user`s name for searching in DB: ',
        name: 'nameDB',
        when(answers) {
          if (answers[`search`] === false) {
            console.log('Thx for using!');
            process.exit();
          } else if (answers[`search`] === true && answers.name == '') {
            const newRead = fs.readFileSync('file.txt', 'utf8');
            console.log(newRead);
          }
          return !answers.name;
        },
      },
    ])
    .then(answers => {
      let data = JSON.parse(fileRead);
      if (typeof answers['search'] == 'undefined') {
        data.push(answers);
      }
      if (
        answers[`search`] === true &&
        typeof answers['nameDB'] != 'undefined'
      ) {
        let res = data.filter(
          answer =>
            answer.name.toLowerCase() == answers['nameDB'].toLowerCase(),
        );
        if (res.length > 1) {
          console.log(res);
          process.exit();
        } else {
          console.log(`User wasn't found `);
          process.exit();
        }
      }
      fs.writeFileSync('file.txt', JSON.stringify(data, null, '  '), 'UTF-8', {
        flags: 'a+',
      });

      askForINfo();
    });
}
askForINfo();
