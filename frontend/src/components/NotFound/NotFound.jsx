import { useNavigate } from 'react-router-dom';
import './style.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-found_box">
        <h2 className="not-found_title">404 Not Found</h2>
        <p className="not-found_desc">You Will be redirected in few seconds</p>
      </div>
      {setTimeout(() => {
        navigate('/home');
      }, 2000)}
    </>
  );
};

export default NotFound;
