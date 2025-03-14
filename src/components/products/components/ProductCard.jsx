import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../services/authentication/AuthContext";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AddProductToCart, DeleteProduct, UpdateProduct } from "../../../api-connection/ApiEndpoints";
import useCategoryImage from "../hooks/useCategoryImages";

const ProductCard = ({ product, refreshTrigger, setRefreshTrigger }) => {
    const { role } = useContext(AuthContext);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [productForm, setProductForm] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        powerConsumption: '',
        stockQuantity: '',

    })
    const image = useCategoryImage(product.category);

    useEffect(() => {
        console.log('selected quantity changed: ', selectedQuantity);
    }, [selectedQuantity]);

    const handleEditProduct = () => {
        setProductForm({
            id: product.id,
            name: product.name,
            price: product.price,
            stockQuantity: product.stockQuantity,
            category: product.category,
            description: product.description,
            powerConsumption: product.powerConsumption,
        })
        setShowModal(true);
    }

    const handleDeleteProduct = async (id) => {
        try {
            await DeleteProduct(id);
            alert("Product deleted successfully!");
            // setRefreshTrigger(refreshTrigger + 1);
            setRefreshTrigger((prev) => prev + 1);

        } catch {
            alert("Failed to delete client. Please try again.");
        }
    };


    const handleAddToCart = async (id, selectedQuantity) => {
        try {
            console.log('sending this item to cart: ', id, 'with quantity', selectedQuantity);

            await AddProductToCart(id, selectedQuantity)

        } catch (err) {
            setError(err.message);
            console.log('Error: ', error);
        }
    }



    const handleSubmitEditedProduct = async (e) => {
        e.preventDefault();
        try {
            await UpdateProduct(productForm);
            setShowModal(false);
            setRefreshTrigger(refreshTrigger + 1)
        } catch (err) {
            console.error('error: ', err.message);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm((prevProductForm) => ({
            ...prevProductForm,
            [name]: value,
        }));
        console.log('current form state: ', productForm);
    }


    return (

        <Col md={4} className="mb-4">
            <Card>
                <CardHeader style={{
                    backgroundImage: image ? `url(${image})` : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    minHeight: "300px",
                }}>
                </CardHeader>
                <CardBody>
                    <p>
                        <strong>{product.name} </strong><br />
                        category: {product.category} <br />
                        price: {product.price} <br />
                        description: {product.description} <br />
                        available stock: {product.stockQuantity} <br />
                        Power: {product.powerConsumption}
                    </p>
                    {role !== "admin" && role !== "superadmin" && (
                        <div>
                            <strong>Quantity: </strong>
                            <label>
                                <input
                                    type="number"
                                    min={1}
                                    max={product.stockQuantity}
                                    value={selectedQuantity}
                                    onChange={(e) => setSelectedQuantity(e.target.value)}
                                />
                            </label>
                        </div>
                    )}
                </CardBody>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmitEditedProduct}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label> Name</Form.Label>
                                <Form.Control type="text" name="name" value={productForm.name} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formLastName">
                                <Form.Label>category</Form.Label>
                                <Form.Control type="text" name="category" value={productForm.category} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formDniNumber">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={productForm.price} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={productForm.description} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formUserName">
                                <Form.Label>stock</Form.Label>
                                <Form.Control type="number" name="stockQuantity" value={productForm.stockQuantity} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Power Consumption</Form.Label>
                                <Form.Control type="number" name="powerConsumption" value={productForm.powerConsumption} onChange={handleInputChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3" >Save Changes</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <CardFooter>

                    {role === "admin" || role === "superadmin" ? (
                        <div>
                            <Button variant="primary" onClick={handleEditProduct}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                        </div>

                    ) : (
                        <Button variant="primary" onClick={() => handleAddToCart(product.id, selectedQuantity)}>
                            Add to Cart
                        </Button>
                    )}

                </CardFooter>
            </Card>
        </Col>
    );



};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        stockQuantity: PropTypes.number.isRequired,
        powerConsumption: PropTypes.number.isRequired
    }).isRequired,
    refreshTrigger: PropTypes.number.isRequired,
    setRefreshTrigger: PropTypes.func.isRequired,
};



export default ProductCard;