import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../../App';
import { useNavigate } from 'react-router-dom';
import AddService from './AddService';
import UpdateService from './UpdateService';
import Orders from './Orders';
import './style.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const Profile = () => {
  const navigator = useNavigate();
  const { userId, token, userServices, setUserServices, isLoggedIn } =
    useContext(UserData);

  const [showUpdate, setShowUpdate] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
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
  const handelCloseOrders = () => {
    setShowOrders(false);
  };

  const handelShowOrders = () => {
    setShowOrders(true);
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
        console.log(`Deleted Service with ID ${res}`);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .delete(`http://127.0.0.1:5000/orders/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(`Deleted All Orders with ID ${res}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getServices = () => {
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
    {
      isLoggedIn ? getServices(userId) : navigator('/login');
    }
  }, []);

  return (
    <div>
      <h2 className="profile-title">Profile</h2>
      <div className="addService">
        <Button onClick={handelShowAdd}>Add New Service</Button>
        <Button
          onClick={() => {
            handelShowOrders();
          }}
        >
          My Orders
        </Button>
      </div>
      <div className="profile-container">
        {userServices.length === 0 ? (
          <NoServices />
        ) : (
          userServices.map((e) => {
            return (
              <Card style={{ width: '20rem' }} key={e._id}>
                <Card.Img
                  variant="top"
                  src={e.imageLink}
                  style={{ height: '212px' }}
                />
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
      <Modal show={showUpdate} onHide={handelCloseUpdate} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {service && (
            <UpdateService
              service={service}
              token={token}
              onUpdate={getServices}
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
      <Modal show={showAdd} onHide={handelCloseAdd} size="lg">
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
      {/* Orders Modal */}
      <Modal show={showOrders} onHide={handelCloseOrders} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Orders />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseOrders}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
