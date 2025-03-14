import { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import AuthContext from "../../services/authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";


const Header = () => {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="w-100 p-0">
        <Container>
          <Navbar.Brand href="/">BUILD-YOUR-PC.COM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <SearchBar />
            <Nav className="ms-auto">
              {!user ? (
                <>
                  <Button
                    variant="outline-light"
                    onClick={handleLogin}
                    className="me-2"
                  >
                    Login
                  </Button>
                  <Button variant="outline-light" onClick={handleSignup}>
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link >Hi, {user.userName}</Nav.Link>
                  {role === "client" && 
                  <><Nav.Link href="/cart">My Cart</Nav.Link>
                  <Nav.Link href="/clientprofile">My Profile</Nav.Link>
                  </>}
                  <Button
                    variant="outline-light"
                    onClick={logout}
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
};


export default Header;