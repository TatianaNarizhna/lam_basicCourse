import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs/promises';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const userDataPath = path.join(__dirname, 'data.json');

const questions = [
  {
    type: 'input',
    message: 'Pls, enter the user name or press ENTER to cancel: ',
    name: 'name',
    when(answers) {
      return !answers.find;
    },
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
      return answers.name;
    },

    // when(answers) {
    //   if (answers.age === ' ') {
    //     ask();
    //   }
    // },
    // when(answers) {
    //   if (answers.search === true) {
    //     readUsers().then(users => console.log(users));
    //   }
    // },
  },
  {
    type: 'input',
    name: 'find',
    message: 'Pls, enter the name you want to find:',
    // when(answers) {
    //   if (answers.search === true) {
    //     readUsers().then(users => console.log(users));
    //   }
    // },
    when(answers) {
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
    users.push(newUser);
    await fs.writeFile(userDataPath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const findUser = async ({ name }) => {
  const users = await readUsers();
  const [result] = users.filter(user => user.name === name);
  return result;
};

// readUsers().then(users => console.log(users));

function ask() {
  inquirer
    .prompt(questions)

    .then(answers => {
      addUsers(answers);

      // ask();
      if (answers.search === true) {
        readUsers().then(users => console.log(users));
      }

      if (answers.find === answers.name) {
        findUser(answers.find).then(user => console.log(user));
      }

      // fs.writeFile('/js/data.json', JSON.stringify(answers));

      // const dataResult = fs.readFile(userDataPath, 'utf8');
      // console.log(dataResult);
      // // const data = JSON.parse(dataResult);
      // ask();
      // const newUser = {
      //   name,
      //   gender,
      //   age,
      // };
      // data.push(newUser);
      // fs.writeFile(userDataPath, JSON.stringify(data, null, 2));
      // console.log(data);
      // return newUser;

      // console.log(JSON.stringify(answers, null, ' '));
    });
}

ask();
