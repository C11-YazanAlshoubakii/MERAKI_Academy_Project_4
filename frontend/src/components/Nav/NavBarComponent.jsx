import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserData } from '../../App';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBarComponent = () => {
  const navigator = useNavigate();
  const { isLoggedIn } = useContext(UserData);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">
          <img
            src="/logo.jpeg"
            alt="logo"
            style={{ width: '4rem', height: '4rem' }}
          />
        </Navbar.Brand>

        {isLoggedIn ? (
          <Nav className="me-auto">
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
            <Button variant="link" href="/login">
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
