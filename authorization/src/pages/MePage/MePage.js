import { NavLink } from 'react-router-dom';

const MePage = () => {
  return (
    <div>
      <NavLink to="/me">me</NavLink>
      <button type="button">logout</button>
    </div>
  );
};

export default MePage;
