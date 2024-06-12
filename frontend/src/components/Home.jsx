import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { UserData } from '../App';

const Home = () => {
  const { token, isLoggedIn } = useContext(UserData);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/services/', {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(res.data.services);
        setServices(res.data.services);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <h1>Services</h1>
      {services.map((e) => {
        return (
          <>
            <h3>{e.serviceTitle}</h3>
            <p>{e.serviceDescription}</p>
            <span>{e.price}</span>
            <span>{e.estimatedTime}</span>
          </>
        );
      })}
    </div>
  );
};

export default Home;
