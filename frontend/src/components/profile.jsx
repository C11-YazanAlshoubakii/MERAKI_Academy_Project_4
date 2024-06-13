import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../App';

const Profile = () => {
  const { userId, token } = useContext(UserData);
  const [userServices, setUserServices] = useState([]);

  const NoServices = () => {
    return (
      <div>
        <h2>No Services Found!!</h2>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/search_1?provider=${userId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setUserServices(res.data.services);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>Profile</h2>

      {userServices.length === 0 ? (
        <NoServices />
      ) : (
        userServices.map((e) => {
          return (
            <div key={e._id}>
              <h3>{e.serviceTitle}</h3>
              <p>{e.serviceDescription}</p>
              <span>{e.price}</span>
              <span>{e.estimatedTime}</span>
              <p>{e.serviceProvider.userName}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Profile;
