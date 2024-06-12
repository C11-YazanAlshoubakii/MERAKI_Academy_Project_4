import { createContext, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Error from './components/NotFound';
import Home from './components/Home';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import './App.css';

export const UserData = createContext();
function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <UserData.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserData.Provider>
    </>
  );
}

export default App;
