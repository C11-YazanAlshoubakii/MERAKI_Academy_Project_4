import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserData } from '../../App';
import AddService from './AddService';
import './style.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const Profile = () => {
  const { userId, token, userServices, setUserServices } = useContext(UserData);

  const NoServices = () => {
    return (
      <>
        <h2 className="profile-title">You Dont have any Services!!</h2>
      </>
    );
  };

  const deleteHandeler = (id) => {
    axios
      .delete(`http://localhost:5000/services/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(`Deleted post with ID ${res}`);
      })
      .catch((err) => {
        console.error(err);
      });
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
      <h2 className="profile-title">Profile</h2>
      <div className="addService">
        {
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add Service</Accordion.Header>
              <Accordion.Body>
                <AddService />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        }
      </div>
      <div className="profile-container">
        {userServices.length === 0 ? (
          <NoServices />
        ) : (
          userServices.map((e) => {
            return (
              <Card style={{ width: '20rem' }} key={e._id}>
                <Card.Img variant="top" src="/logo.jpeg" />
                <Card.Body>
                  <Card.Title>{e.serviceTitle}</Card.Title>
                  <Card.Text>{e.serviceDescription}</Card.Text>
                  <p>Price: {e.price}</p>
                  <p>estimatedTime: {e.estimatedTime}</p>
                  <Button variant="primary" style={{ marginRight: '10px' }}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteHandeler(e._id);
                      setUserServices(
                        userServices.filter((elem) => elem._id !== e._id)
                      );
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
