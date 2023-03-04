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
  let set = new Set(array);
  return set;
};

Array.prototype.filter = function (array, predicate) {
  let result = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (predicate(element)) {
      result.push(element);
    }
  }
  return result;
};

Array.prototype.filterIndexed = function (arr, callback) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (callback(element, i, arr)) {
      result.push([element, i]);
    }
  }

  return result;
};

Array.prototype.filterNot = function (array, predicate) {
  const result = [];

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

const predicate = x => x.length > 1;
const filterPredicate = x => x > 3;
const arr = ['moon', 'sun', 'star', 'cloud', 'planet'];
const array = [1, 2, 3, 4, 5];
const arrayDistinctBy = ['book', 'pencil', 'pen', 'laptop', 'book', 'pen'];
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

console.log(arr.associateBy(arr));
console.log(arr.all(arr, predicate));
console.log(arr.any(arr, predicate));
console.log(arr.average(array));
console.log(arr.chunked(arr, 2));
console.log(arrayDistinctBy.distinctBy(arrayDistinctBy));
console.log(arr.filter(array, filterPredicate));
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

// Array.prototype.flatten = function (array) {
//   let result = [];

//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     if (Array.isArray(element)) {
//       return flatten(element);
//     } else {
//       result.push(element);
//     }
//   }
//   return result;
// };
