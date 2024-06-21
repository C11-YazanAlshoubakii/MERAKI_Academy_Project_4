import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../../App';
import AddService from './AddService';
import UpdateService from './UpdateService';
import './style.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const Profile = () => {
  const { userId, token, userServices, setUserServices } = useContext(UserData);

  const [showUpdate, setShowUpdate] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [service, setService] = useState(null);

  const handelCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handelShowUpdate = (service) => {
    setService(service);
    setShowUpdate(true);
  };
  const handelCloseAdd = () => {
    setShowAdd(false);
  };
  const handelShowAdd = () => {
    setShowAdd(true);
  };

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

  const onUpdate = () => {
    axios
      .get(`http://localhost:5000/services/search_1?provider=${userId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setUserServices(res.data.services);
        handelCloseUpdate();
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
        {<Button onClick={handelShowAdd}>Add New Service</Button>}
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
                  <Button
                    variant="primary"
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      handelShowUpdate(e);
                    }}
                  >
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
      <Modal show={showUpdate} onHide={handelCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {service && (
            <UpdateService
              service={service}
              token={token}
              onUpdate={onUpdate}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Service Modal */}
      <Modal show={showAdd} onHide={handelCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddService close={handelCloseAdd} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseAdd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
