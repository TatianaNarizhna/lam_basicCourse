import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './modules/Navbar/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';
import MePage from './pages/MePage/MePage';
import SignupPage from './pages/SignupPage/SignupPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
