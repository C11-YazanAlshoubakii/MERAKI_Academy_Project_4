import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Register = () => {
  const sendRegReq = (body) => {
    axios
      .post('http://localhost:5000/users/register', body)
      .then(() => {
        navigate('/Login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [tempPass, setTempPass] = useState('');

  const handleSubmit = () => {
    sendRegReq({ userName, email, password, phone });
  };

  // Show error message
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control-box error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  // show success outline
  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control-box success';
  }

  function checkRequired(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      return true;
    }
  }

  // getFieldName
  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // CheckLength
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(input, `${getFieldName(input)} must be > ${min}`);
    } else if (input.value.length > max) {
      showError(input, `${getFieldName(input)} must be < ${max}`);
    } else {
      showSuccess(input);
    }
  }

  // check password match
  function checkPasswordMatch(input1, input2) {
    if (input1 !== input2.value) {
      showError(input2, 'Password do not match');
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <h2 className="reg-comp__title">Register</h2>
      <div className="reg-comp">
        <div className="img-box">
          {' '}
          <img src="/logo.png" className="img" alt="logo" />
        </div>
        <div className="register-box">
          <div className="form-control-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              onChange={(e) => {
                if (checkRequired(e.target)) {
                  setUserName(e.target.value);
                }
              }}
            />
            <small>Error message</small>
          </div>
          <div className="form-control-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => {
                const rgex =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (rgex.test(e.target.value.trim())) {
                  showSuccess(e.target);
                  setEmail(e.target.value);
                } else {
                  showError(e.target, 'Email is not valid');
                }
              }}
            />
            <small>Error message</small>
          </div>

          <div className="form-control-box">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone"
              onChange={(e) => {
                if (checkRequired(e.target)) {
                  setPhone(e.target.value);
                }
              }}
            />
            <small>Error message</small>
          </div>

          <div className="form-control-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => {
                checkLength(e.target, 8, 24);
                setTempPass(e.target.value);
              }}
            />
            <small>Error message</small>
          </div>

          <div className="form-control-box">
            <label htmlFor="password2">Confirm password</label>
            <input
              type="password"
              id="password2"
              placeholder="Enter Password again"
              onChange={(e) => {
                if (checkPasswordMatch(tempPass, e.target)) {
                  setPassword(e.target.value);
                  showSuccess(e.target);
                } else {
                  showError(e.target, 'Password do not match');
                }
              }}
            />
            <small>Error message</small>
          </div>

          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
