import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout';
import Error from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NavBarComponent from './components/Nav/NavBarComponent';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const UserData = createContext();
function App() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userServices, setUserServices] = useState([]);

  return (
    <>
      <UserData.Provider
        value={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          userId,
          setUserId,
          userName,
          setUserName,
          userServices,
          setUserServices,
        }}
      >
        <NavBarComponent />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserData.Provider>
    </>
  );
}

export default App;
