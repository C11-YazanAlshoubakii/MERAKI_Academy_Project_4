import { useState, useContext, useEffect } from 'react';
import { UserData } from '../../App';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const Orders = () => {
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
        <thead>
          <tr>
            <th>No.</th>
            <th>Service Title</th>
            <th>User</th>
            <th>Status</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
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
                        variant={variantClass}
                        id="dropdown-basic"
                      >
                        {e.status}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
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
                <td>{e.completed + ''}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
