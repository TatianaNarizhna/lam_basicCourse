import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs/promises';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const userDataPath = path.join(__dirname, 'data.txt');

const questions = [
  {
    type: 'input',
    message: 'Pls, enter the user name or press ENTER to cancel: ',
    name: 'name',
    // when(answers) {
    //   if (!answers.name) {
    //     return answers.name;
    //   }
    //   return !answers.name;
    // },
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
  {
    type: 'input',
    name: 'find',
    message: 'Pls, enter the name you want to find:',
    when(answers) {
      if (answers[`search`] === false) {
        console.log('Bye');
        process.exit();
      } else if (answers[`search`] === true) {
        readUsers().then(users => console.log(users));
      }
      return !answers.name;
    },
  },
];

const readUsers = async () => {
  try {
    const result = await fs.readFile(userDataPath, 'utf8');
    const users = JSON.parse(result);
    return users;
  } catch (error) {
    // console.error(error);
    users = '[]';
    console.log('no data');
  }
};

const addUsers = async ({ name, gender, age }) => {
  try {
    const users = await readUsers();
    const newUser = {
      name,
      gender,
      age,
    };
    if (newUser.name !== '') {
      users.push(newUser);
      await fs.writeFile(userDataPath, JSON.stringify(users, null, 2));
    }
  } catch (error) {
    console.error(error);
  }
};

const findUser = async name => {
  const users = await readUsers();
  const [result] = users.filter(
    user => user.name.toLowerCase() === name.toLowerCase(),
  );
  return result;
};

function ask() {
  inquirer
    .prompt(questions)

    .then(answers => {
      addUsers(answers);

      if (answers[`search`] === true && typeof answers['find'] != 'undefined') {
        findUser(answers.find).then(user => console.log('User found: ', user));
      }

      ask();
    });
}
ask();
