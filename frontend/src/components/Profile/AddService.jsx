import { useState, useContext } from 'react';
import { UserData } from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function AddService({ close }) {
  const { token, setUserServices, userServices } = useContext(UserData);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'Services');
    data.append('cloud_name', 'dbicxd0qm');
    return fetch('https://api.cloudinary.com/v1_1/dbicxd0qm/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImageUrl(data.url);
        return data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewService = (imageURL) => {
    const newService = {
      serviceTitle: title,
      serviceDescription: desc,
      price: price,
      estimatedTime: time,
      imageLink: imageURL,
    };

    axios
      .post('http://localhost:5000/services/', newService, {
        headers: { authorization: token },
      })
      .then(() => {
        setUserServices([...userServices, newService]);
        setLoading(false);
        close();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleAddService = () => {
    setLoading(true);
    uploadImage()
      .then((uploadedImageUrl) => {
        addNewService(uploadedImageUrl);
      })
      .catch((error) => {
        console.log('Error adding service:', error);
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="fs-3">Service Title</Form.Label>
        <Form.Control
          className="fs-3"
          type="text"
          placeholder="Service Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fs-3">Service Description</Form.Label>
        <Form.Control
          className="fs-3"
          as="textarea"
          rows={3}
          placeholder="Service Description"
          onChange={(e) => setDesc(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label className="fs-3">Price</Form.Label>
        <Form.Control
          className="fs-3"
          type="text"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label className="fs-3">Estimated Time</Form.Label>
        <Form.Control
          className="fs-3"
          type="text"
          placeholder="Estimated Time"
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label className="fs-3">Service Image</Form.Label>
        <Form.Control
          className="fs-3"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" className="fs-3" onClick={handleAddService}>
        {loading ? (
          <Spinner animation="border" variant="light" size="lg" />
        ) : (
          'Add'
        )}
      </Button>
    </Form>
  );
}

export default AddService;
