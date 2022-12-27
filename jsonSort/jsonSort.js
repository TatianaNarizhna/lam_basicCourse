import axios from 'axios';

const ulrs = [
  'https://jsonbase.com/lambdajson_type1/793',
  'https://jsonbase.com/lambdajson_type1/955',
];

let positive = 0;
let negative = 0;

function findResult() {}

const fetchOneLink = async url => {
  try {
    let response = axios.get(url);
  } catch (error) {
    console.log(error.message);
  }
};

function fetchLinks(links) {
  links.map(async el => {
    await fetchOneLink(el);
  });
  console.log(`Results true: ${positive}, \nResults false: ${negative} `);
}

fetchLinks(ulrs);

// const ulrs = [
//   'https://jsonbase.com/lambdajson_type1/793',
//   'https://jsonbase.com/lambdajson_type1/955',
//   'https://jsonbase.com/lambdajson_type1/231',
//   'https://jsonbase.com/lambdajson_type1/931',
//   'https://jsonbase.com/lambdajson_type1/93',
//   'https://jsonbase.com/lambdajson_type2/342',
//   'https://jsonbase.com/lambdajson_type2/770',
//   'https://jsonbase.com/lambdajson_type2/491',
//   'https://jsonbase.com/lambdajson_type2/281',
//   'https://jsonbase.com/lambdajson_type2/718',
//   'https://jsonbase.com/lambdajson_type3/310',
//   'https://jsonbase.com/lambdajson_type3/806',
//   'https://jsonbase.com/lambdajson_type3/469',
//   'https://jsonbase.com/lambdajson_type3/258',
//   'https://jsonbase.com/lambdajson_type3/516',
//   'https://jsonbase.com/lambdajson_type4/79',
//   'https://jsonbase.com/lambdajson_type4/706',
//   'https://jsonbase.com/lambdajson_type4/521',
//   'https://jsonbase.com/lambdajson_type4/350',
//   'https://jsonbase.com/lambdajson_type4/64',
// ];
