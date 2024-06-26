import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Comments from './Comments';
import Orders from './Orders';
import './style.css';

const Home = () => {
  const navigator = useNavigate();
  const {
    token,
    setUserId,
    isLoggedIn,
    userId,
    services,
    setServices,
    title,
    setTitle,
  } = useContext(UserData);
  const [showComments, setShowComments] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [service, setService] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handelCloseConfirmOrder = () => {
    setShowConfirmOrder(false);
    setSuccess(false);
  };

  const handelShowConfirmOrder = () => {
    setShowConfirmOrder(true);
  };

  const addOrder = (serviceId) => {
    const newOrder = {
      userId,
      serviceId,
    };
    axios
      .post('http://127.0.0.1:5000/orders/', newOrder, {
        headers: { authorization: token },
      })
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const filterServicesByPrice = () => {
    const filteredByPrice = services.filter((item) => {
      if (item.price <= 10) {
        return item;
      }
    });
    setServices(filteredByPrice);
  };
  const filterServicesByEstimatedTime = () => {
    const filteredByEstimatedTime = services.filter((item) => {
      if (item.estimatedTime <= 3) {
        return item;
      }
    });
    setServices(filteredByEstimatedTime);
  };

  const getSerivcesByTitle = () => {
    if (title === '') {
      getServices();
      return;
    }

    const filteredByTitle = services.filter((item) => {
      if (item.serviceTitle.toLowerCase().includes(title.toLowerCase())) {
        return item;
      }
    });
    setServices(filteredByTitle);
  };

  useEffect(() => {
    {
      isLoggedIn ? getServices() : navigator('/login');
    }
  }, [title]);

  return (
    <div>
      <h1 className="home-title">Our Services</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          onClick={() => {
            handelShowOrders();
          }}
        >
          My Orders
        </Button>
      </div>
      <Accordion style={{ width: '70%', margin: '0 auto' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Search</Accordion.Header>
          <Accordion.Body>
            <Form className="d-flex" style={{ marginRight: '20px' }}>
              <Form.Control
                type="search"
                placeholder="Enter Service Title"
                value={title}
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <Button onClick={getSerivcesByTitle}>Search</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Filter</Accordion.Header>
          <Accordion.Body>
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link eventKey="/home" onClick={getServices}>
                  None
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#" onClick={filterServicesByPrice}>
                  Price less than 10
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-1"
                  onClick={filterServicesByEstimatedTime}
                >
                  Estimated Time less than 3 days
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="home-container">
        {services.map((e) => {
          return (
            <Card style={{ width: '20rem' }} key={e._id}>
              <Card.Img variant="top" src="/logo.jpeg" />
              <Card.Body>
                <Card.Title>Service Title: {e.serviceTitle}</Card.Title>
                <Card.Text>Description: {e.serviceDescription}</Card.Text>
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
                <Button
                  variant="primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setService(e);
                    handelShowConfirmOrder();
                  }}
                >
                  Order
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      {/* Comments Mmodal */}
      <Modal show={showComments} onHide={handelCloseComments} size="lg">
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
      {/* Confirm Order */}
      <Modal show={showConfirmOrder} onHide={handelCloseConfirmOrder}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are You Sure you want to order this Service??
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              addOrder(service._id);
            }}
          >
            Order
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'space-between' }}>
          {success && <Alert variant="success">Order Added Successfully</Alert>}
          <Button variant="secondary" onClick={handelCloseConfirmOrder}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
