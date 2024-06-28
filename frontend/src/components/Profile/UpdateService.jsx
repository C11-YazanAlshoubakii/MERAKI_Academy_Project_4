import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateService = ({ service, token, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const newService = {
    serviceTitle: title,
    serviceDescription: desc,
    price: price,
    estimatedTime: estimatedTime,
  };
  const updateHandeler = (id) => {
    axios
      .put(`http://localhost:5000/services/${id}`, newService, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(`updated post with ID ${res}`);
        onUpdate();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="update-service">
        <h2 className="update-edit_title">Update Service</h2>
        <Form.Group className="mb-3">
          <Form.Label className="fs-3">Service Title</Form.Label>
          <Form.Control
            defaultValue={service.serviceTitle}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fs-3">Service Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={service.serviceDescription}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fs-3">Service Price</Form.Label>
          <Form.Control
            defaultValue={service.price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fs-3">Service Estimated Time</Form.Label>
          <Form.Control
            defaultValue={service.estimatedTime}
            onChange={(e) => {
              setEstimatedTime(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button
          className="fs-3"
          bg={'#5795fd'}
          onClick={() => {
            updateHandeler(service._id);
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default UpdateService;
