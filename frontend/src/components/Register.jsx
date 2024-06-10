import { useState } from 'react';
import axios from 'axios';

const sendRegReq = (body) => {
  axios
    .post('http://localhost:5000/users/register', body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    sendRegReq({ userName, email, password, phone });
  };
  return (
    <div className="register-box">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="user Name"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
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
      <input
        type="text"
        placeholder="Phone"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Register;
