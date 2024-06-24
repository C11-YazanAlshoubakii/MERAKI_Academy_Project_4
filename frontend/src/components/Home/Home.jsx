import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Comments from './Comments';
import Orders from './Orders';
import './style.css';

const Home = () => {
  const navigator = useNavigate();
  const { token, setUserId, isLoggedIn } = useContext(UserData);
  const [services, setServices] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [service, setService] = useState(null);

  const handelCloseComments = () => {
    setShowComments(false);
  };

  const handelShowComments = () => {
    setShowComments(true);
  };

  const handelCloseOrders = () => {
    setShowOrders(false);
  };

  const handelShowOrders = () => {
    setShowOrders(true);
  };

  const getServices = () => {
    axios
      .get('http://localhost:5000/services/', {
        headers: { authorization: token },
      })
      .then((res) => {
        setUserId(res.data.userId);
        setServices(res.data.services);
      })
      .catch(() => {
        navigator('/login');
      });
  };

  useEffect(() => {
    {
      isLoggedIn ? getServices() : navigator('/login');
    }
  }, []);

  return (
    <div>
      <h1 className="home-title">Our Services</h1>
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={() => {
            handelShowOrders();
          }}
        >
          My Orders
        </Button>
      </div>
      <div className="home-container">
        {services.map((e) => {
          return (
            <Card style={{ width: '20rem' }} key={e._id}>
              <Card.Img variant="top" src="/logo.jpeg" />
              <Card.Body>
                <Card.Title>{e.serviceTitle}</Card.Title>
                <Card.Text>{e.serviceDescription}</Card.Text>
                <p>Price: {e.price}</p>
                <p>Estimated Time: {e.estimatedTime}</p>
                <p>Service Provider: {e.serviceProvider.userName}</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setService(e);
                    handelShowComments();
                  }}
                >
                  Comments
                </Button>
              </Card.Body>
              <Card.Body>
                <Button variant="primary" style={{ width: '100%' }}>
                  Order
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <Modal show={showComments} onHide={handelCloseComments}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Comments
            service={service}
            services={getServices}
            close={handelCloseComments}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseComments}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Orders Modal */}
      <Modal show={showOrders} onHide={handelCloseOrders}>
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

export default Home;
