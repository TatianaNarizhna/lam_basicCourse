let messageObj = {
  answerArr: ['aaaa', 'ggg', 'f'],

  foo() {
    let res = [];

    const arr = [...this.answerArr].map((el, i) => {});
  },
};

console.log(messageObj.foo());
// const ooo = Number('2');
// console.log(typeof ooo);

// answerArr1 = ['jaja', 'momm', 'ala'];
// const res1 = [...this.answerArr1].sort((a, b) => a.localeCompare(b));
// console.log(res1);
