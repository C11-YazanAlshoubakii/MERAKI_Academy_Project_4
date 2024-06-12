import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../App';

const profile = () => {
  const { userId, token } = useContext(UserData);
  const [userServices, setUserServices] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/search_1?provider=${userId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        setUserServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {userServices.map((e) => {
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

export default profile;
