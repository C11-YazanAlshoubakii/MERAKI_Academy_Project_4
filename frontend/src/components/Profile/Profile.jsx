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
        <h2 className="profile-title">You Dont have any Services</h2>
        <svg
          data-name="Layer 1"
          width="790"
          height="490"
          viewBox="0 0 790 512.20805"
        >
          <path
            d="M925.56335,704.58909,903,636.49819s24.81818,24.81818,24.81818,45.18181l-4.45454-47.09091s12.72727,17.18182,11.45454,43.27273S925.56335,704.58909,925.56335,704.58909Z"
            transform="translate(-205 -193.89598)"
            fill="#e6e6e6"
          />
          <path
            d="M441.02093,642.58909,419,576.13509s24.22155,24.22155,24.22155,44.09565l-4.34745-45.95885s12.42131,16.76877,11.17917,42.23245S441.02093,642.58909,441.02093,642.58909Z"
            transform="translate(-205 -193.89598)"
            fill="#e6e6e6"
          />
          <path
            d="M784.72555,673.25478c.03773,43.71478-86.66489,30.26818-192.8092,30.35979s-191.53562,13.68671-191.57335-30.028,86.63317-53.29714,192.77748-53.38876S784.68782,629.54,784.72555,673.25478Z"
            transform="translate(-205 -193.89598)"
            fill="#e6e6e6"
          />
          <rect y="509.69312" width="790" height="2" fill="#3f3d56" />
          <polygon
            points="505.336 420.322 491.459 420.322 484.855 366.797 505.336 366.797 505.336 420.322"
            fill="#a0616a"
          />
          <path
            d="M480.00587,416.35743H508.3101a0,0,0,0,1,0,0V433.208a0,0,0,0,1,0,0H464.69674a0,0,0,0,1,0,0v-1.54149A15.30912,15.30912,0,0,1,480.00587,416.35743Z"
            fill="#2f2e41"
          />
          <polygon
            points="607.336 499.322 593.459 499.322 586.855 445.797 607.336 445.797 607.336 499.322"
            fill="#a0616a"
          />
          <path
            d="M582.00587,495.35743H610.3101a0,0,0,0,1,0,0V512.208a0,0,0,0,1,0,0H566.69674a0,0,0,0,1,0,0v-1.54149A15.30912,15.30912,0,0,1,582.00587,495.35743Z"
            fill="#2f2e41"
          />
          <path
            d="M876.34486,534.205A10.31591,10.31591,0,0,0,873.449,518.654l-32.23009-131.2928L820.6113,396.2276l38.33533,126.949a10.37185,10.37185,0,0,0,17.39823,11.0284Z"
            transform="translate(-205 -193.89598)"
            fill="#a0616a"
          />
          <path
            d="M851.20767,268.85955a11.38227,11.38227,0,0,0-17.41522,1.15247l-49.88538,5.72709,7.58861,19.24141,45.36779-8.49083a11.44393,11.44393,0,0,0,14.3442-17.63014Z"
            transform="translate(-205 -193.89598)"
            fill="#a0616a"
          />
          <path
            d="M769,520.58909l21.76811,163.37417,27.09338-5.578s-3.98437-118.98157,9.56238-133.32513S810,505.58909,810,505.58909Z"
            transform="translate(-205 -193.89598)"
            fill="#2f2e41"
          />
          <path
            d="M778,475.58909l-10,15s-77-31.99929-77,19-4.40631,85.60944-6,88,18.43762,8.59375,28,7c0,0,11.79687-82.21884,11-87,0,0,75.53355,37.03335,89.87712,33.84591S831.60944,536.964,834,530.58909s-1-57-1-57l-47.81-14.59036Z"
            transform="translate(-205 -193.89598)"
            fill="#2f2e41"
          />
          <path
            d="M779.34915,385.52862l-2.85032-3.42039s-31.92361-71.82815-19.3822-91.21035,67.26762-22.23252,68.97783-21.0924-4.08488,15.9428-.09446,22.78361c0,0-42.394,9.19121-45.24435,10.33134s21.96615,43.2737,21.96615,43.2737l-2.85031,25.6529Z"
            transform="translate(-205 -193.89598)"
            fill="#ccc"
          />
          <path
            d="M835.21549,350.18459S805.57217,353.605,804.432,353.605s-1.71017-7.41084-1.71017-7.41084l-26.223,35.91406S763.57961,486.29929,767,484.58909s66.50531,8.11165,67.07539,3.55114-.57008-27.3631,1.14014-28.50324,29.64328-71.82811,29.64328-71.82811-2.85032-14.82168-12.54142-19.95227S835.21549,350.18459,835.21549,350.18459Z"
            transform="translate(-205 -193.89598)"
            fill="#ccc"
          />
          <path
            d="M855.73783,378.11779l9.121,9.69109S878.41081,499.1687,871,502.58909s-22,3-22,3l-14.35458-52.79286Z"
            transform="translate(-205 -193.89598)"
            fill="#ccc"
          />
          <circle cx="601.72966" cy="122.9976" r="26.2388" fill="#a0616a" />
          <path
            d="M800.57267,320.98789c-.35442-5.44445-7.22306-5.631-12.67878-5.68255s-11.97836.14321-15.0654-4.35543c-2.0401-2.973-1.65042-7.10032.035-10.28779s4.45772-5.639,7.18508-7.99742c7.04139-6.08884,14.29842-12.12936,22.7522-16.02662s18.36045-5.472,27.12788-2.3435c10.77008,3.84307,25.32927,23.62588,26.5865,34.99176s-3.28507,22.95252-10.9419,31.44586-25.18188,5.0665-36.21069,8.088c6.7049-9.48964,2.28541-26.73258-8.45572-31.164Z"
            transform="translate(-205 -193.89598)"
            fill="#2f2e41"
          />
          <circle cx="361.7217" cy="403.5046" r="62.98931" fill="#5795fd" />
          <path
            d="M524.65625,529.9355a45.15919,45.15919,0,0,1-41.25537-26.78614L383.44873,278.05757a59.83039,59.83039,0,1,1,111.87012-41.86426l72.37744,235.41211a45.07978,45.07978,0,0,1-43.04,58.33008Z"
            transform="translate(-205 -193.89598)"
            fill="#5795fd"
          />
        </svg>
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
        <Button
          style={{
            backgroundColor: '#5795fd',
            borderColor: '#5795fd',
          }}
          onClick={handelShowAdd}
          title="Add New Service"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-bag-plus-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"
            />
          </svg>
        </Button>
        <p>Add Service</p>
        <Button
          style={{ backgroundColor: '#5795fd', borderColor: '#5795fd' }}
          title="Confirm Orders"
          onClick={() => {
            handelShowOrders();
          }}
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
        </Button>
        <p>Confirm Orders</p>
      </div>
      <div className="profile-container">
        {userServices.length === 0 ? (
          <NoServices />
        ) : (
          userServices.map((e) => {
            return (
              <Card style={{ width: '90%' }} key={e._id}>
                <Card.Img
                  variant="top"
                  src={e.imageLink}
                  style={{ height: '212px' }}
                />
                <Card.Body>
                  <Card.Title className="fs-1">
                    Title: {e.serviceTitle}
                  </Card.Title>
                  <Card.Text className="fs-2">
                    Desc: {e.serviceDescription}
                  </Card.Text>
                  <p className="fs-4">Price: {e.price}</p>
                  <p className="fs-4">estimatedTime: {e.estimatedTime}</p>
                  <Button
                    className="fs-4"
                    variant="primary"
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      handelShowUpdate(e);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="fs-4"
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
      <Modal
        show={showUpdate}
        onHide={handelCloseUpdate}
        size="lg"
        style={{ marginTop: '100px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-3">Update Service</Modal.Title>
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
          <Button
            variant="secondary"
            className="fs-3"
            onClick={handelCloseUpdate}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Service Modal */}
      <Modal
        show={showAdd}
        onHide={handelCloseAdd}
        size="lg"
        style={{ marginTop: '100px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-3">Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddService close={handelCloseAdd} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="fs-3" onClick={handelCloseAdd}>
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
