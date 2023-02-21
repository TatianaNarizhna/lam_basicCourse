import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import MePage from '../../pages/MePage/MePage';

const AppBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const { isLoggedIn } = useAuth();

  return <header>{isLoggedIn ? <MePage /> : <Navbar />}</header>;
};

export default AppBar;
