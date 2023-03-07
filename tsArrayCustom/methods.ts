interface Array<T> {
  /**
   * @param {string} array - Takes an array.
   * @param {Function} predicate - The callback/condition.
   * @returns {true} Returns true if all elements match the given predicate.
   */
  all(
    array: string[],
    predicate: (arrg: string) => boolean,
  ): boolean | undefined;

  /**
   * @param {string} array - Takes an array.
   * @param {Function} predicate - The callback/condition.
   * @returns {true} Returns true if sequence has at least one element.
   */
  any(
    array: string[],
    predicate: (arrg: string) => boolean,
  ): boolean | undefined;

  /**
   * @param {string} array - Takes an array.
   * @returns {true} Returns a Map containing the elements from the given sequence indexed by the key returned from keySelector function applied to each element.
   */
  associateBy(array: string[]): object;

  /**
   * @param {number} array - Takes an array.
   * @returns {number} Returns an average value of elements in the sequence.
   */
  average(array: number[]): number;

  /**
   * @param {string} array - Takes an array.
   * @param {number} size - The number of elements to take in each list.
   * @returns {T[]} Splits this sequence into a sequence of lists each not exceeding the given size.
   */
  chunked(array: string[], size: number): T[];

  /**
   * @param {string} array - Takes an array.
   * @returns {object} Returns a sequence containing only elements from the given sequence having distinct keys.
   */
  distinctBy(array: string[]): object;

  /**
   * @param {number} array - Takes an array.
   * @param {Function} predicate - The callback/condition.
   * @returns {T[]} Returns a sequence containing only elements matching the given predicate.
   */
  filter(array: number[], predicate: (arrg: number) => boolean): T[];

  /**
   * @param {number} array - Takes an array.
   * @param {Function} callback - The callback/condition.
   * @returns {T[]} Returns a sequence containing only elements matching the given predicate.
   */
  filterIndexed(
    array: number[],
    callback: (arrg: number, array: number[]) => boolean,
  ): T[];

  /**
   * @param {number} array - Takes an array.
   * @param {Function} predicate - The callback/condition.
   * @returns {T[]} Returns a sequence containing all elements not matching the given predicate.
   */
  filterNot(array: number[], predicate: (arrg: number) => boolean): T[];

  /**
   * @param {number} array - Takes an array.
   * @param {Function} predicate - The callback/condition.
   * @returns {number} Returns the first element matching the given predicate, or null if no such element was found
   */
  find(array: number[], predicate: (arrg: number) => boolean): number;

  /**
   * @param {number} array - Takes an array.
   * @param {Function} predicate - The callback/condition.
   * @returns {number | null} Returns the last element matching the given predicate, or null if no such element was found.
   */
  findLast(
    array: number[],
    predicate: (arrg: number) => boolean,
  ): number | null;

  /**
   * @param {Array} array - Takes a multidimensional array.
   * @returns {T[]} Returns a sequence of all elements from all iterables in this sequence.
   */
  flatten(array: (T | T[])[]): T[];

  /**
   * Function that takes current accumulator value and an element, and calculates the next accumulator value.
   * @param {number} array - Takes an array.
   * @returns {number} Returns accumulates value starting with initial value.
   */
  fold(array: number[]): number;

  /**
   * @param {number} array - Takes a multidimensional array.
   * @returns {number} Returns the first element yielding the largest value of the given function.
   */
  maxBy(array: number[]): number;

  /**
   * @param {number} array - Takes a multidimensional array.
   * @returns {number} Returns the first element yielding the smallest value of the given function.
   */
  minBy(array: number[]): number;

  /**
   * @param {T[]} array - Takes a multidimensional array.
   * @returns {number} Returns the number of elements in this sequence.
   */
  count(array: T[]): number;

  /**
   * Groups elements of the original sequence by the key returned by the given keySelector function applied to each element.
   * @param {T[]} array - Takes a multidimensional array.
   * @returns {object} Returns a map where each group key is associated with a list of corresponding elements.
   */
  groupBy(array: T[]): object;
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

Array.prototype.fold = function (array) {
  let result = 0;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    result += element;
  }
  return result;
};

Array.prototype.maxBy = function (array) {
  let max = array[0];
  for (let index = 0; index < array.length; index++) {
    const currElement = array[index];
    const maxElement = max;

    if (currElement > maxElement) {
      max = currElement;
    }
  }
  return max;
};

Array.prototype.minBy = function (array) {
  let max = array[0];
  for (let index = 0; index < array.length; index++) {
    const currElement = array[index];
    const maxElement = max;

    if (currElement < maxElement) {
      max = currElement;
    }
  }
  return max;
};

Array.prototype.count = function (array) {
  let ttl = 0;
  for (const element of array) {
    let population = element.population;
    ttl += population;
  }
  return ttl;
};

Array.prototype.groupBy = function (array) {
  let groups = {};

  for (const element of array) {
    const key = element.rating;
    if (key in groups) {
      groups[key].push(element);
    } else {
      groups[key] = element;
    }
  }
  return groups;
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
const count = [
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
console.log(arr.average(array));
console.log(arr.chunked(arr, 2));
console.log(arrayDistinctBy.distinctBy(arrayDistinctBy));
console.log(array.filter(array, filterPredicate));
console.log(array.filterIndexed(array, filterPredicate));
console.log(array.filterNot(array, filterPredicate));
console.log(array.find(array, filterPredicate));
console.log(array.findLast(array, filterPredicate));
console.log(arrFlatten.flatten(arrFlatten));
console.log(array.fold(array));
console.log(array.maxBy(array));
console.log(array.minBy(array));
console.log(count.count(count));
console.log(count.groupBy(count));
