import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav_bar">
      <span>NavBar</span>
      <div className="nav-links">
        <Link to={'/'}>Home</Link>
        <Link to={'/register'}>Register</Link>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default Nav;
