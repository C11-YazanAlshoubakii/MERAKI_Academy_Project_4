import { useState, useContext } from 'react';
import { UserData } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setToken, setIsLoggedIn } = useContext(UserData);

  const loginFunction = (body) => {
    axios
      .post('http://localhost:5000/users/login', body)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setIsLoggedIn(true);
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        navigate('/register');
      });
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    loginFunction({ email, password });
  };
  return (
    <>
      <h2 className="reg-comp__title">Login</h2>
      <div className="reg-comp">
        <div className="img-box">
          <img src="/logo.jpeg" alt="logo" className="img" />
        </div>
        <div className="register-box">
          <div className="form-control-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="btn-submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
