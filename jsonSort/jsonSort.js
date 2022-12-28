import axios from 'axios';

const ulrs = [
  'https://jsonbase.com/lambdajson_type1/793',
  'https://jsonbase.com/lambdajson_type1/955',
  'https://jsonbase.com/lambdajson_type1/231',
  'https://jsonbase.com/lambdajson_type1/931',
  'https://jsonbase.com/lambdajson_type1/93',
  'https://jsonbase.com/lambdajson_type2/342',
  'https://jsonbase.com/lambdajson_type2/770',
  'https://jsonbase.com/lambdajson_type2/491',
  'https://jsonbase.com/lambdajson_type2/281',
  'https://jsonbase.com/lambdajson_type2/718',
  'https://jsonbase.com/lambdajson_type3/310',
  'https://jsonbase.com/lambdajson_type3/806',
  'https://jsonbase.com/lambdajson_type3/469',
  'https://jsonbase.com/lambdajson_type3/258',
  'https://jsonbase.com/lambdajson_type3/516',
  'https://jsonbase.com/lambdajson_type4/79',
  'https://jsonbase.com/lambdajson_type4/706',
  'https://jsonbase.com/lambdajson_type4/521',
  'https://jsonbase.com/lambdajson_type4/350',
  'https://jsonbase.com/lambdajson_type4/64',
];

let positive = [];
let negative = [];

function findResult(linkObj) {
  for (const key in linkObj) {
    let value = linkObj[key];

    if (typeof value === 'object') {
      findResult(value);
    } else if (typeof value === 'boolean') {
      console.log('desired value: ', value);
      if (value === true) {
        positive.push(value);
      } else {
        negative.push(value);
      }
    }
  }
}

const fetchOneLink = async url => {
  try {
    const response = await axios.get(url);
    const resJson = response.data;
    findResult(resJson);
  } catch (error) {
    let numberOfFetches = 0;
    console.log('ooops, try again');

    while (numberOfFetches > 3) {
      await fetchOneLink(url);
      numberOfFetches += 1;
    }
  }
};

async function fetchLinks(links) {
  for (const link of links) {
    await fetchOneLink(link);
  }
  console.log(
    `Results true: ${positive.length}, \nResults false: ${negative.length} `,
  );
}
fetchLinks(ulrs);
