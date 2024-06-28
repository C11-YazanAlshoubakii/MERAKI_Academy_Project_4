import { useContext, useState } from 'react';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const DeleteOrder = ({ disabled, id, onDelete }) => {
  const { token, userId } = useContext(UserData);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [success, setSuccess] = useState(false);

  const handelCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setSuccess(false);
    onDelete(userId);
  };

  const handelShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const deleteOrder = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/orders/order/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(`Deleted Service with ID ${res}`);
        handelCloseConfirmDelete();
        onDelete(userId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteBtn = (
    <>
      <Button
        className="fs-4"
        variant="danger"
        onClick={() => {
          handelShowConfirmDelete();
        }}
      >
        Delete
      </Button>
      <Modal
        show={showConfirmDelete}
        style={{ marginTop: '100px' }}
        onHide={handelCloseConfirmDelete}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Are You Sure you want to delete this order ??
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="danger"
            className="fs-4"
            style={{ width: '100%' }}
            onClick={() => {
              deleteOrder(id);
              onDelete(userId);
            }}
          >
            Delete
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'space-between' }}>
          {success && <Alert variant="success">Order Added Successfully</Alert>}
          <Button
            variant="secondary"
            className="fs-4"
            onClick={handelCloseConfirmDelete}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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
