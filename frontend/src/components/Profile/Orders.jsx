import { useState, useContext, useEffect } from 'react';
import { UserData } from '../../App';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const Orders = () => {
  const navigator = useNavigate();
  const { token, userId, isLoggedIn } = useContext(UserData);
  const [order, setOrder] = useState([]);

  const getOrders = (userId) => {
    axios
      .get(`http://127.0.0.1:5000/orders/orders?provider=${userId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeOrderCompleted = (id, isCompleted) => {
    const updatedOrder = {
      completed: isCompleted,
    };

    axios
      .put(`http://127.0.0.1:5000/orders/completed/${id}`, updatedOrder, {
        headers: { authorization: token },
      })
      .then(() => {
        getOrders(userId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeOrderStatus = (id, newStatus) => {
    const updatedOrder = {
      status: newStatus,
    };

    axios
      .put(`http://127.0.0.1:5000/orders/${id}`, updatedOrder, {
        headers: { authorization: token },
      })
      .then(() => {
        getOrders(userId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeVariantClass = (status) => {
    if (status === 'Pending') return 'warning';
    if (status === 'Accepted') return 'success';
    return 'danger';
  };

  useEffect(() => {
    {
      isLoggedIn ? getOrders(userId) : navigator('/login');
    }
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead className="fs-3">
          <tr>
            <th>No.</th>
            <th>Service Title</th>
            <th>User</th>
            <th>Status</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody className="fs-4">
          {order.map((e, i) => {
            const variantClass = changeVariantClass(e.status);
            return (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.serviceId.serviceTitle}</td>
                <td>{e.userId.userName}</td>
                <td>
                  {
                    <Dropdown>
                      <Dropdown.Toggle
                        className="fs-4"
                        variant={variantClass}
                        id="dropdown-basic"
                      >
                        {e.status}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="fs-4"
                        onClick={(x) => {
                          const newStatus = x.target.id;
                          changeOrderStatus(e._id, newStatus);
                        }}
                      >
                        <Dropdown.Item id="Pending">Pending</Dropdown.Item>
                        <Dropdown.Item id="Accepted">Accepted</Dropdown.Item>
                        <Dropdown.Item id="Declined">Declined</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="info"
                      className="fs-4"
                      id="dropdown-basic"
                    >
                      {e.completed.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className="fs-4"
                      onClick={(x) => {
                        const isCompleted = x.target.id === 'true';
                        changeOrderCompleted(e._id, isCompleted);
                      }}
                    >
                      <Dropdown.Item id="true">True</Dropdown.Item>
                      <Dropdown.Item id="false">False</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
