Array.prototype.all = function (array, predicate) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (!predicate(element)) {
      return false;
    }
    return true;
  }
};

Array.prototype.any = function (array, predicate) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (predicate(element)) {
      return true;
    }
    return false;
  }
};

Array.prototype.associateBy = function (arr) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = item[0];
    result[key] = item;
  }
  return result;
};

Array.prototype.average = function (array) {
  let ttl = 0;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    ttl += element;
  }
  return ttl / array.length;
};

Array.prototype.chunked = function (array, size) {
  let arr = [];
  for (let index = 0; index < array.length; index++) {
    const chunk = array.slice(index, index + size);
    arr.push(chunk);
  }
  return arr;
};

Array.prototype.distinctBy = function (array) {
  let result = [];
  let map = new Map();
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const key = [element];
    console.log(key);

    if (map.has(key)) {
      return;
    }
    map.set(key);
    // result.push(element);
  }
  return map;
};

// console.log(Array.prototype.associateBy(['fff', 'ggg', 'rrr']));

const predicate = x => x.length > 1;
const arr = ['moon', 'sun', 'star', 'cloud', 'planet'];
const array = [1, 2, 3, 4, 5];
const arrayDistinctBy = [
  { name: 'book' },
  { name: 'pencil' },
  { name: 'pen' },
  { name: 'laptop' },
];
console.log(arr.associateBy(arr));
console.log(arr.all(arr, predicate));
console.log(arr.any(arr, predicate));
console.log(arr.average(array));
console.log(arr.chunked(arr, 2));
console.log(arrayDistinctBy.distinctBy(arrayDistinctBy));
