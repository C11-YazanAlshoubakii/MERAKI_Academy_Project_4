import Register from './components/Register';
import Login from './components/Login';
import Error from './components/NotFound';
import Home from './components/Home';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
