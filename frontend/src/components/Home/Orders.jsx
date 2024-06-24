import { useState, useContext, useEffect } from 'react';
import { UserData } from '../../App';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const Orders = () => {
  const { token, userId, isLoggedIn } = useContext(UserData);
  const [order, setOrder] = useState([]);

  const getOrders = (userId) => {
    axios
      .get(`http://127.0.0.1:5000/orders/orders_user?user=${userId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <th>Service Provider</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {order.map((e, i) => {
            {
              console.log(e);
            }
            return (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.serviceId.serviceTitle}</td>
                <td>{e.serviceId.serviceProvider.userName}</td>
                <td>{e.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
