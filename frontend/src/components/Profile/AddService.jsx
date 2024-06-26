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
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
      .then((res) => {
        console.log(res, 'Done');
        console.log(imageURL);
        setUserServices([...userServices, newService]);
        close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddService = () => {
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
        <Form.Label>Service Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Service Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Service Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Service Description"
          onChange={(e) => setDesc(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Estimated Time</Form.Label>
        <Form.Control
          type="text"
          placeholder="Estimated Time"
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Service Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleAddService}>
        Add
      </Button>
    </Form>
  );
}

export default AddService;
