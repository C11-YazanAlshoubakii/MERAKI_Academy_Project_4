import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './style.css';

const Home = () => {
  const navigator = useNavigate();
  const { token, setUserId, isLoggedIn } = useContext(UserData);
  const [services, setServices] = useState([]);

  useEffect(() => {
    {
      isLoggedIn
        ? axios
            .get('http://localhost:5000/services/', {
              headers: { authorization: token },
            })
            .then((res) => {
              setUserId(res.data.userId);
              setServices(res.data.services);
            })
            .catch((err) => {
              navigator('/login');
            })
        : navigator('/login');
    }
  }, []);

  return (
    <div>
      <h1 className="home-title">Our Services</h1>
      <div className="home-container">
        {services.map((e) => {
          return (
            <Card style={{ width: '18rem' }} key={e._id}>
              <Card.Img variant="top" src="/logo.jpeg" />
              <Card.Body>
                <Card.Title>{e.serviceTitle}</Card.Title>
                <Card.Text>{e.serviceDescription}</Card.Text>
                <span>{e.price}</span>
                <span>{e.estimatedTime}</span>
                <p>{e.serviceProvider.userName}</p>
                <Button variant="primary">Order</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
