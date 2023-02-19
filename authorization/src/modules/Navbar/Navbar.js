import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import items from './items';

const Navbar = () => {
  const elements = items.map(({ id, text, link }) => (
    <li key={id}>
      <NavLink className={s.link} to={link}>
        {text}
      </NavLink>
    </li>
  ));

  return <ul className={s.menu}>{elements}</ul>;
};

export default Navbar;
