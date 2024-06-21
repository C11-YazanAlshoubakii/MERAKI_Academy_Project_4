import { useContext, useEffect } from 'react';
import { UserData } from '../../App';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn } = useContext(UserData);

  useEffect(() => {
    setIsLoggedIn(false);
    setToken('');
    navigate('/login');
  });
};

export default Logout;
