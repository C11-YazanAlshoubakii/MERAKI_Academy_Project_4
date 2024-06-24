import { useState, useContext, useEffect } from 'react';
import { UserData } from '../../App';
import Table from 'react-bootstrap/Table';
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
            return (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.serviceId.serviceTitle}</td>
                <td>{e.userId.userName}</td>
                <td>{e.status}</td>
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
