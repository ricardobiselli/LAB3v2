import { useContext } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import AuthContext from "../../services/authentication/AuthContext";
import { useNavigate } from "react-router-dom";
// import { GetCategories } from "../../api-connection/ApiEndpoints";
// import Products from "../product-list/Products";

const Header = () => {
  const { user, role, logout } = useContext(AuthContext);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await GetCategories();
  //       console.log('categories response: ', response);
  //       setCategories(response.data || []);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  // const handleCategoryFilter = async (category) => {
  //   setSelectedCategory(category); // Actualizamos el estado de la categoría seleccionada
  // };

  return (
    <div className="w-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="w-100 p-0">
        <Container>
          <Navbar.Brand href="/">BUILD-YOUR-PC.COM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex mx-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
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
                  <Nav.Link href="/profile">Hi, {user.userName}</Nav.Link>
                  {role === "client" && <Nav.Link href="/cart">My Cart</Nav.Link>}
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

      {/* Menú horizontal para filtrar productos por categoría
      <Navbar bg="light" className="border-top">
        <Container>
          <Nav className="w-100 justify-content-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category === selectedCategory ? "secondary" : "outline-secondary"}
                className="mx-2"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </Nav>
        </Container>
      </Navbar>
      {/* {user && (<Products selectedCategory={selectedCategory} />)} */} 
    </div>
  );
};

export default Header;