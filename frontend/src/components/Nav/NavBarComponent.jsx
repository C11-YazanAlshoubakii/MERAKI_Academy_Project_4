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
    <Navbar bg="dark" variant="dark" key={false}>
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigator('/home');
          }}
        >
          <img
            src="/logo.jpeg"
            alt="logo"
            style={{ width: '4rem', height: '4rem', cursor: 'pointer' }}
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
              >
                Home
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  navigator('/profile');
                }}
              >
                Profile
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  navigator('/logout');
                }}
              >
                Logout
              </Button>
            </Nav>
            <Nav className="user-badge">
              <h3>
                <Badge bg="secondary">{userName}</Badge>
              </h3>
            </Nav>
          </>
        ) : (
          <Nav className="me-auto">
            <Button
              variant="link"
              onClick={() => {
                navigator('/register');
              }}
            >
              Register
            </Button>
            <Button
              variant="link"
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
