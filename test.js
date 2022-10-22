let messageObj = {
  answerArr: ['aaaa', 'ggg', 'f', '5', '5', '8'],

  foo() {
    let res = [...this.answerArr];
    console.log(res);

    const numArr = this.answerArr.map(el => +el);
    console.log(numArr);

    // return numArr.filter((el, index, arr) => arr.indexOf(el) === index);

    // for (let index = 0; index < this.answerArr.length - 1; index++) {
    //   // const element = array[index];
    //   let a = this.answerArr[index].length;
    //   let b = this.answerArr[index + 1].length;
    //   console.log(a, b);

    //   if (a > b) {
    //     let temp = a;
    //     a = b;
    //     b = temp;
    //   }
    //   this.answerArr[index] = a;
    //   this.answerArr[index + 1] = b;
    // }
    // console.log(this.answerArr);

    // return this.answerArr;
    // const arr = [...this.answerArr].map(el => {
    //   let a = el.length;
    //   b = [el.length] + 1;
    //   console.log(a, b);
    // });
  },
};

console.log(messageObj.foo());
// const ooo = Number('2');
// console.log(typeof ooo);

// answerArr1 = ['jaja', 'momm', 'ala'];
// const res1 = [...this.answerArr1].sort((a, b) => a.localeCompare(b));
// console.log(res1);
