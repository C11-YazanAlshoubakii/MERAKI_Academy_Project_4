import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserData } from '../App';

const Nav = () => {
  const { isLoggedIn } = useContext(UserData);
  return (
    <div className="nav_bar">
      <span>Logo</span>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to={'/home'}>Home</Link>
            <Link to={'/logout'}>Logout</Link>
          </>
        ) : (
          <>
            <Link to={'/register'}>Register</Link>
            <Link to={'/login'}>Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
