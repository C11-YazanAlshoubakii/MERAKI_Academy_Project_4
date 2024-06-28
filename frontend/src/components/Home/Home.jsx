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
import Pagination from 'react-bootstrap/Pagination';
import Comments from './Comments';
import Orders from './Orders';
import Slider from './Slider/Slider';
import Offcanvas from 'react-bootstrap/Offcanvas';
import About from '../About/About';
import './style.css';

import Bannar from '../Home/bannar.png';

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
    originalServices,
    setOriginalServices,
  } = useContext(UserData);

  const [showComments, setShowComments] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [service, setService] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseCanvas = () => setShowOffCanvas(false);
  const handleShowCanvas = () => setShowOffCanvas(true);

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
        setOriginalServices(res.data.services);
        setPaginationCounter(0);
        paginationHandler(0, res.data.services);
      })
      .catch(() => {
        navigator('/login');
      });
  };

  const paginationHandler = (counter, servicesList = originalServices) => {
    setServices(servicesList.slice(counter, counter + 9));
  };

  const filterServicesByPrice = () => {
    const filteredByPrice = originalServices.filter((item) => item.price <= 10);
    setServices(filteredByPrice);
  };

  const filterServicesByEstimatedTime = () => {
    const filteredByEstimatedTime = originalServices.filter(
      (item) => item.estimatedTime <= 3
    );
    setServices(filteredByEstimatedTime);
  };

  const getSerivcesByTitle = () => {
    if (title === '') {
      getServices();
      return;
    }

    const filteredByTitle = originalServices.filter((item) =>
      item.serviceTitle.toLowerCase().includes(title.toLowerCase())
    );
    setServices(filteredByTitle);
  };

  useEffect(() => {
    isLoggedIn ? getServices() : navigator('/login');
  }, [isLoggedIn]);

  useEffect(() => {
    getSerivcesByTitle();
  }, [title]);

  useEffect(() => {
    paginationHandler(paginationCounter);
  }, [paginationCounter]);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Slider />
        <h1 className="home-title">Our Services</h1>
        <div className="controller">
          <Button
            style={{
              backgroundColor: '#5795fd',
              borderColor: '#5795fd',
            }}
            className="my-orders"
            onClick={handelShowOrders}
            title="My Orders"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-bag-check-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
              />
            </svg>
            <span>
              <br />
              My
              <br />
              Orders
            </span>
          </Button>
          <Button
            style={{ backgroundColor: '#5795fd', borderColor: '#5795fd' }}
            onClick={handleShowCanvas}
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <span>
              <br />
              Search
            </span>
          </Button>
        </div>
      </div>

      <div className="home-container">
        {services.map((e) => (
          <Card style={{ width: '90%' }} key={e._id}>
            <Card.Img
              variant="top"
              src={e.imageLink}
              style={{ height: '210px' }}
            />
            <Card.Body style={{ padding: '15px' }}>
              <Card.Title className="fs-1">{e.serviceTitle}</Card.Title>
              <Card.Text className="fs-2">{e.serviceDescription}</Card.Text>
              <p className="fs-4">{e.price}$</p>
              <p className="fs-4">Estimated Time: {e.estimatedTime} Days</p>
              <p className="fs-4">
                Service Provider: {e.serviceProvider.userName}
              </p>
              <Button
                className="fs-4"
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
                className="fs-2"
                style={{
                  width: '100%',
                  backgroundColor: '#5795fd',
                  borderColor: '#5795fd',
                }}
                onClick={() => {
                  setService(e);
                  handelShowConfirmOrder();
                }}
              >
                Order
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev
            linkClassName="fs-2"
            onClick={() => {
              const newCounter = paginationCounter - 9;
              if (newCounter >= 0) {
                setPaginationCounter(newCounter);
                paginationHandler(newCounter);
              }
            }}
          />
          {[...Array(Math.ceil(originalServices.length / 9)).keys()].map(
            (page) => (
              <Pagination.Item
                linkClassName="fs-2"
                key={page}
                active={page * 9 === paginationCounter}
                onClick={() => {
                  const newCounter = page * 9;
                  setPaginationCounter(newCounter);
                  paginationHandler(newCounter);
                }}
              >
                {page + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            linkClassName="fs-2"
            onClick={() => {
              const newCounter = paginationCounter + 9;
              if (newCounter < originalServices.length) {
                setPaginationCounter(newCounter);
                paginationHandler(newCounter);
              }
            }}
          />
        </Pagination>
      </div>
      <div style={{ width: '100%' }}>
        <img
          src={Bannar}
          alt="bannar"
          style={{ width: '100%', height: '', marginBottom: '50px' }}
        />
      </div>
      <About />

      {/* Search OffCanvas*/}
      <Offcanvas show={showOffCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header style={{ marginTop: '100px' }} closeButton>
          <Offcanvas.Title className="fs-2">Search & Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Control
            type="text"
            placeholder="Enter Service Title"
            value={title}
            className="me-2 fs-3"
            aria-label="Text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <Accordion
            style={{ width: '100%', margin: '0 auto', fontSize: '1.4rem' }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span style={{ fontSize: '2rem' }}>Filter</span>
              </Accordion.Header>
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
        </Offcanvas.Body>
      </Offcanvas>
      {/* Comments Modal */}
      <Modal
        show={showComments}
        onHide={handelCloseComments}
        size="lg"
        style={{ marginTop: '100px' }}
      >
        <Modal.Header className="fs-4" closeButton>
          <Modal.Title style={{ fontSize: '2.8rem' }}>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Comments
            service={service}
            services={getServices}
            close={handelCloseComments}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="fs-4"
            onClick={handelCloseComments}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Orders Modal */}
      <Modal
        show={showOrders}
        onHide={handelCloseOrders}
        size="lg"
        style={{ marginTop: '100px' }}
      >
        <Modal.Header className="fs-4" closeButton>
          <Modal.Title className="fs-2">Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Orders />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="fs-4"
            onClick={handelCloseOrders}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Confirm Order */}
      <Modal
        show={showConfirmOrder}
        onHide={handelCloseConfirmOrder}
        style={{ marginTop: '100px' }}
      >
        <Modal.Header className="fs-4" closeButton>
          <Modal.Title>
            Are You Sure you want to order this Service??
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            className="fs-4"
            style={{ width: '100%' }}
            onClick={() => {
              addOrder(service._id);
            }}
          >
            Order
          </Button>
        </Modal.Body>
        <Modal.Footer
          className="fs-4"
          style={{ justifyContent: 'space-between' }}
        >
          {success && <Alert variant="success">Order Added Successfully</Alert>}
          <Button
            variant="secondary"
            className="fs-4"
            onClick={handelCloseConfirmOrder}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
