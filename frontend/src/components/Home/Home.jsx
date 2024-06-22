import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './style.css';

const Home = () => {
  const navigator = useNavigate();
  const { token, userId, setUserId, isLoggedIn } = useContext(UserData);
  const [services, setServices] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = (serviceId) => {
    const comment = {
      comment: newComment,
      commenter: userId,
    };
    axios
      .post(`http://localhost:5000/services/${serviceId}/comments`, comment, {
        headers: { authorization: token },
      })
      .then((res) => {
        setServices([...services]);
        console.log(res);
        setNewComment('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    {
      isLoggedIn
        ? axios
            .get('http://localhost:5000/services/', {
              headers: { authorization: token },
            })
            .then((res) => {
              setUserId(res.data.userId);
              setServices(res.data.services);
            })
            .catch(() => {
              navigator('/login');
            })
        : navigator('/login');
    }
  }, []);

  return (
    <div>
      <h1 className="home-title">Our Services</h1>
      <div className="home-container">
        {services.map((e) => {
          return (
            <Card style={{ width: '20rem' }} key={e._id}>
              <Card.Img variant="top" src="/logo.jpeg" />
              <Card.Body>
                <Card.Title>{e.serviceTitle}</Card.Title>
                <Card.Text>{e.serviceDescription}</Card.Text>
                <span>{e.price}</span>
                <span>{e.estimatedTime}</span>
                <p>{e.serviceProvider.userName}</p>
                <Button variant="primary">Order</Button>
              </Card.Body>
              <Card.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments</Accordion.Header>
                    <Accordion.Body>
                      <InputGroup className="mb-3">
                        <Form.Control
                          aria-label="Text input with button"
                          placeholder="Enter Comment"
                          onChange={(e) => {
                            setNewComment(e.target.value);
                          }}
                        />
                      </InputGroup>
                      <Button
                        style={{ width: '100%' }}
                        onClick={() => {
                          addComment(e._id);
                        }}
                      >
                        Comment
                      </Button>
                      {e.comments.map((comment) => {
                        return (
                          <div key={comment._id}>
                            <p>
                              {comment.commenter.userName}:{comment.comment}
                            </p>
                            <hr />
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
