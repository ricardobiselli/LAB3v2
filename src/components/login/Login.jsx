import { useState, useContext } from "react";
import AuthContext from "../../services/authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos
    const success = await login(userNameOrEmail, password);
    if (success) {
      navigate("/products")
    } else {
      setError("Invalid credentials...try again!");
    }
  };

  return (
    <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-4 centered-content">
        <h2 className="mb-4">Login</h2>
          <Form onSubmit={handleSubmit} className="w-100 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email or username"
                value={userNameOrEmail}
                onChange={(e) => setUserNameOrEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;