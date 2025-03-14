import { useEffect, useState, useContext } from "react";
import { AddProductToCart, GetCartFromClient, PlaceAnOrderFromCartContent, RemoveItemFromCart } from "../../api-connection/ApiEndpoints";
import { Alert, Button, Card, Container, Row, Col , ListGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../services/authentication/AuthContext";

const ShoppingCart = () => {
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const totalCart = cart.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const { user } = useContext(AuthContext);



    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const products = await GetCartFromClient(user.sub);
                setCart(products.shoppingCartProducts || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCart();
    }, [cart, user.sub]);

    const handleConfirmOrder = async () => {
        try {
            await PlaceAnOrderFromCartContent();
            alert("Order confirmed successfully!");

            navigate("/myorders")
        } catch (err) {
            setError(err.message);
        };
    };

    const handleAddItemFromCart = async (productId, quantity) => {

        try {
            await AddProductToCart(productId, quantity)
        } catch (err) {
            setError(err.message);
            console.log('error: ', error)
        }
    }

    const handleRemoveItemFromCart = async (productId, quantity) => {
        console.log('sending this product for deletion: ', productId, 'with quantity: ', quantity);
        try {
            await RemoveItemFromCart(productId, quantity)
        } catch (err) {
            setError(err.message);
            console.log('error: ', error);
        }
    }

  
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">your shopping cart</h1>
      
      {cart.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="info" className="text-center p-4">
              <p className="mb-3">Your cart is empty...</p>
              <p className="mb-3">pick up some products!</p>
              <Button variant="primary" onClick={() => navigate("/productlist")}>
                 Products
              </Button>
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={8}>
            <Card className="mb-4 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <Row>
                  <Col md={6}>Item</Col>
                  <Col md={2} className="text-center">Price</Col>
                  <Col md={2} className="text-center">Quantity</Col>
                  <Col md={2} className="text-center">Sub-total</Col>
                </Row>
              </Card.Header>
              <ListGroup variant="flush">
                {cart.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <h6>{item.productName}</h6>
                      </Col>
                      <Col md={2} className="text-center">
                        ${item.unitPrice.toFixed(2)}
                      </Col>
                      <Col md={2} className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleRemoveItemFromCart(item.productId, 1)}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleAddItemFromCart(item.productId, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col md={2} className="text-center">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Total:</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <span className="fw-bold">${totalCart.toFixed(2)}</span>
                </div>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}
                <Button 
                  variant="success" 
                  className="w-100"
                  onClick={() => handleConfirmOrder()}
                >
                  Confirm Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ShoppingCart;