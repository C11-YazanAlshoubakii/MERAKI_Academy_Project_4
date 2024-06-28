import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserData } from '../../App';
import './style.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const NavBarComponent = () => {
  const navigator = useNavigate();
  const { isLoggedIn, userName } = useContext(UserData);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      key={false}
      className="position-sticky top-0"
      style={{ zIndex: '100000000' }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigator('/home');
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: '8rem',
              height: '8rem',
              cursor: 'pointer',
              borderRadius: '11px',
            }}
          />
        </Navbar.Brand>

        {isLoggedIn ? (
          <>
            <Nav className="me-auto" style={{ position: 'relative' }}>
              <Button
                variant="link"
                onClick={() => {
                  navigator('/home');
                }}
                className="fs-2 nav-link"
                style={{ color: '#5795fd', textDecoration: 'none' }}
              >
                Home
              </Button>
              <Button
                variant="link"
                className="fs-2 nav-link"
                style={{ color: '#5795fd', textDecoration: 'none' }}
                onClick={() => {
                  navigator('/profile');
                }}
              >
                Profile
              </Button>
              <Button
                variant="link"
                className="fs-2 nav-link"
                style={{ color: '#5795fd', textDecoration: 'none' }}
                onClick={() => {
                  navigator('/logout');
                }}
              >
                Logout
              </Button>
            </Nav>
            <Nav className="user-badge">
              <h3
                style={{
                  backgroundColor: '#5795fd',
                  borderRadius: '7px',
                  padding: '5px',
                }}
              >
                <Badge
                  bg="0"
                  onClick={() => {
                    navigator('/profile');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                    style={{ verticalAlign: '-3' }}
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  <span className="fs-2"> {userName}</span>
                </Badge>
              </h3>
            </Nav>
          </>
        ) : (
          <Nav className="me-auto">
            <Button
              variant="link"
              className="fs-2 nav-link"
              style={{ color: '#5795fd', textDecoration: 'none' }}
              onClick={() => {
                navigator('/register');
              }}
            >
              Register
            </Button>
            <Button
              variant="link"
              className="fs-2 nav-link"
              style={{ color: '#5795fd', textDecoration: 'none' }}
              onClick={() => {
                navigator('/login');
              }}
            >
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
