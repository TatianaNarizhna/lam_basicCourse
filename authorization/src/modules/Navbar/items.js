import { nanoid } from 'nanoid';

const items = [
  {
    id: nanoid(),
    text: 'signup',
    link: '/signup',
  },
  {
    id: nanoid(),
    text: 'login',
    link: '/login',
  },
  // {
  //   id: nanoid(),
  //   text: 'me',
  //   link: '/me',
  // },
];

export default items;
