import { useContext, useState } from 'react';
import { UserData } from '../../App';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

const Comments = ({ service, close, services }) => {
  const { token, userId } = useContext(UserData);
  const [newComment, setNewComment] = useState('');

  const serviceId = service._id;

  const addComment = (serviceId) => {
    const comment = {
      comment: newComment,
      commenter: userId,
    };
    axios
      .post(`http://localhost:5000/services/${serviceId}/comments`, comment, {
        headers: { authorization: token },
      })
      .then(() => {
        close();
        services();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
          addComment(serviceId);
        }}
      >
        Comment
      </Button>
      {service.comments.map((x) => {
        return (
          <div key={x._id}>
            <p>
              {x.commenter.userName} : {x.comment}
            </p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
