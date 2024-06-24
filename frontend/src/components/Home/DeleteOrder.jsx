import { useContext } from 'react';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const DeleteOrder = ({ disabled, id, onDelete }) => {
  const { token, userId } = useContext(UserData);
  const deleteOrder = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/orders/order/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(`Deleted Service with ID ${res}`);
        onDelete(userId);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const deleteBtn = (
    <Button
      variant="danger"
      onClick={() => {
        deleteOrder(id);
      }}
    >
      Delete
    </Button>
  );
  const deleteDisabledBtn = (
    <Button variant="danger" disabled>
      Delete
    </Button>
  );
  if (disabled) {
    return deleteDisabledBtn;
  }
  return deleteBtn;
};

export default DeleteOrder;
