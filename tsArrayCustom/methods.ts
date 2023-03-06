interface Array<T> {
  all(
    array: string[],
    predicate: (arrg: string) => boolean,
  ): boolean | undefined;

  any(
    array: string[],
    predicate: (arrg: string) => boolean,
  ): boolean | undefined;

  associateBy(array: string[]): object;

  average(array: number[]): number;

  chunked(array: string[], size: number): T[];

  distinctBy(array: string[]): object;

  filter(array: number[], predicate: (arrg: number) => boolean): T[];

  filterIndexed(
    array: number[],
    callback: (arrg: number, array: number[]) => boolean,
  ): T[];

  filterNot(array: number[], predicate: (arrg: number) => boolean): T[];

  find(array: number[], predicate: (arrg: number) => boolean): number;

  findLast(
    array: number[],
    predicate: (arrg: number) => boolean,
  ): number | null;

  flatten(array: (T | T[])[]): T[];
}

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
  let arr: string[][] = [];
  for (let index = 0; index < array.length; index++) {
    const chunk = array.slice(index, index + size);
    arr.push(chunk);
  }
  return arr;
};

Array.prototype.distinctBy = function (array) {
  let set = new Set(array);
  return set;
};

Array.prototype.filter = function (array, predicate) {
  let result: number[] = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (predicate(element)) {
      result.push(element);
    }
  }
  return result;
};

Array.prototype.filterIndexed = function (arr, callback) {
  const result: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (callback(element, arr)) {
      result.push([element]);
    }
  }
  return result;
};

Array.prototype.filterNot = function (array, predicate) {
  const result: number[] = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (!predicate(element)) {
      result.push(element);
    }
  }
  return result;
};

Array.prototype.find = function (array, predicate) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (predicate(element)) {
      return element;
    }
  }
  return null;
};

Array.prototype.findLast = function (array, predicate) {
  for (let index = array.length; index >= 0; index--) {
    const element = array[index];

    if (predicate(element)) {
      return element;
    }
  }
  return null;
};

Array.prototype.flatten = function (array) {
  let result = array.flat(Infinity);

  return result;
};

const arr = ['moon', 'sun', 'star', 'cloud', 'planet'];
const predicate = (x: string) => x.length > 1;
const filterPredicate = (x: number) => x > 3;
const array: number[] = [1, 2, 3, 4, 5];
const arrayDistinctBy: string[] = [
  'book',
  'pencil',
  'pen',
  'laptop',
  'book',
  'pen',
];
const arrFlatten = [1, [2, 3], [4, [5, 6]]];
const count: any[] = [
  {
    country: 'NL',
    population: 15000,
    rating: 10,
  },
  {
    country: 'BL',
    population: 11000,
    rating: 9,
  },
  {
    country: 'UK',
    population: 25000,
    rating: 8,
  },
];

console.log(arr.all(arr, predicate));
console.log(arr.any(arr, predicate));
console.log(arr.associateBy(arr));
console.log(arr.chunked(arr, 2));
console.log(arrayDistinctBy.distinctBy(arrayDistinctBy));
console.log(array.filter(array, filterPredicate));
console.log(array.filterIndexed(array, filterPredicate));
console.log(array.filterNot(array, filterPredicate));
console.log(array.find(array, filterPredicate));
console.log(array.findLast(array, filterPredicate));
console.log(arrFlatten.flatten(arrFlatten));
// console.log(arr.average(array));
// console.log(array.fold(array));
// console.log(array.maxBy(array));
// console.log(array.minBy(array));
// console.log(count.count(count));
// console.log(count.groupBy(count));
