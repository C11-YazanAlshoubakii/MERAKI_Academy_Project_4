import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { UserData } from '../App';

const Home = () => {
  const { token } = useContext(UserData);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/services/', {
        headers: { authorization: token },
      })
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  });

  return (
    <div>
      <h1>Services</h1>
      {services.map((e) => {
        return (
          <div key={e._id}>
            <h3>{e.serviceTitle}</h3>
            <p>{e.serviceDescription}</p>
            <span>{e.price}</span>
            <span>{e.estimatedTime}</span>
            <p>{e.serviceProvider.userName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
