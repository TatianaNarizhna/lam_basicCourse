import readline from 'readline';

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// function foo(mess) {
//   return new Promise((resolve, reject) => {
//     if (mess) {
//       resolve(mess);
//       //   resolve('How would you like to sort');
//     }
//     reject('Enter the words');
//   });
// }

// const promisFoo = foo('hi 5 move');

// promisFoo.then(onFullField).catch(onReject);

// function onFullField(result) {
//   console.log(result);
// }

// function onReject(error) {
//   console.log(error);
// }

// const func = mess => {
// return Promise.resolve(`${mess}`)
// }
// mess('jj 5 move').then(onFullField)

//1 const promise = new Promise((resolve, reject) => {});

// promise
//   .then(result => {
//     return result;
//   })
//   .then();

// 2 promise.then(onFullField, onReject);

// function onFullField(result) {}

// function onReject(error) {}

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
