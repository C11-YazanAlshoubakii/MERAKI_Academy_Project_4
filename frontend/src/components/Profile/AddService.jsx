import { useState, useContext } from 'react';
import { UserData } from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function AddService({ close }) {
  const { token, setUserServices, userServices } = useContext(UserData);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');

  const addNewService = () => {
    const newService = {
      serviceTitle: title,
      serviceDescription: desc,
      price: price,
      estimatedTime: time,
    };
    axios
      .post('http://localhost:5000/services/', newService, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(res, 'Done');
        setUserServices([...userServices, newService]);
        close();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Service Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Service Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Service Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Service Description"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Estimated Time</Form.Label>
        <Form.Control
          type="text"
          placeholder="Estimated Time"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => {
          addNewService();
        }}
      >
        Add
      </Button>
    </Form>
  );
}

export default AddService;
