import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const loginFunction = (body) => {
    axios
      .post('http://localhost:5000/users/login', body)
      .then((res) => {
        console.log(res);
        navigate('/');
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
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
