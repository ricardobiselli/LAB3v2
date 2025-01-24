import { AddProductToCart, GetProducts, UpdateProduct, AddProduct } from "../../api-connection/ApiEndpoints";
import { CloseButton, Container, Modal, Card, Button, Row, Col, ModalHeader, ModalFooter, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import AuthContext from "../../services/authentication/AuthContext";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Products = () => {
    const [products, setProducts] = useState([]);
    // const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        stockQuantity: '',
        powerConsumption: ''
    });
    const [errors, setErrors] = useState({

        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        powerConsumption: ''
    });


    const { user, role } = useContext(AuthContext);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GetProducts();
                setProducts(response || []);
                console.log('data de products: ', response.data);

            } catch (err) {
                // setError(err.message);
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const handleQuantityChange = (productId, value) => {
        // Actualizar la cantidad solo para el producto específico
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value > 0 ? value : 1
        }));
    };

    const handleAddToCart = (productId) => {
        if (!user || role != 'client') {
            alert('please register and sign-in first!');
            return;
        }
        const quantity = quantities[productId] || 1;
        console.log(`Sending to backend: ProductId = ${productId}, Quantity = ${quantity}`);
        AddProductToCart(productId, quantity);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditForm({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            stockQuantity: product.stockQuantity,
            powerConsumption: product.powerConsumption
        });
        setShowModal(true);
    };

    const validate = () => {
        const newErrors = {};
    
        if (!editForm.name || editForm.name.length < 3 || editForm.name.length > 50) {
            newErrors.name = "Product name must be between 3 and 50 characters.";
        }
    
        if (!editForm.description || editForm.description.length < 10 || editForm.description.length > 200) {
            newErrors.description = "Description must be between 10 and 200 characters.";
        }
    
        if (!editForm.price || editForm.price <= 0) {
            newErrors.price = "Price must be greater than 0.";
        }
    
        if (!editForm.stockQuantity || editForm.stockQuantity < 0) {
            newErrors.stockQuantity = "Stock quantity must be a non-negative number.";
        }
    
        if (!editForm.category || editForm.category.length < 3 || editForm.category.length > 20) {
            newErrors.category = "Category must be between 3 and 20 characters.";
        }
    
        if (!editForm.powerConsumption || editForm.powerConsumption < 0) {
            newErrors.powerConsumption = "Power consumption must be a non-negative number.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Guardar cambios al editar un producto
    const handleEditSave = async () => {
        if (!validate()) {
            return; // Detener si hay errores de validación
        }
    
        try {
            const productToUpdate = {
                id: selectedProduct.id,
                ...editForm,
            };
            const response = await UpdateProduct(productToUpdate);
            console.log('Success updating!: ', response);
    
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === selectedProduct.id ? { ...product, ...productToUpdate } : product
                )
            );
            setShowModal(false);
        } catch (err) {
            // setError(err.message);
            console.error('Error updating product:', err);
        }
    };
    
    // Confirmar nuevo producto
    const handleConfirmNewProduct = async () => {
        if (!validate()) {
            return; // Detener si hay errores de validación
        }
    
        try {
            const newProduct = { ...editForm };
            const response = await AddProduct(newProduct);
            console.log('Success adding product:', response);
            setProducts((prevProducts) => [...prevProducts, response.data]);
            setShowModal(false);
        } catch (err) {
            // setError(err.message);
            console.error('Error adding new product:', err);
        }
    };
    
    

    // const handleEditSave = async (editForm) => {
       

        
    //     if (!validate()) {
    //         return;
    //     }
        
        

    //     try {
    //         const productToUpdate = {
    //             id: selectedProduct.id,
    //             name: editForm.name,
    //             description: editForm.description,
    //             category: editForm.category,
    //             price: editForm.price,
    //             stockQuantity: editForm.stockQuantity,
    //             powerConsumption: editForm.powerConsumption,
    //         }
    //         const response = await UpdateProduct(productToUpdate);
    //         console.log('Success updating!: ', response);

    //         setProducts((prevProducts) =>
    //             prevProducts.map((product) =>
    //                 product.id === selectedProduct.id ? { ...product, ...productToUpdate } : product 
    //         ));

    //         setShowModal(false);

    //     } catch (err) {
    //         setError(err)
    //         console.error('Error, update unsuccessful', error);
    //     }
    //     setShowModal(false);

    // };


    const handleAdd = () => {
        setSelectedProduct(null);
        setEditForm({
            name: '',
            description: '',
            category: '',
            price: '',
            stockQuantity: '',
            powerConsumption: '',
        });
        setShowModal(true);
    };

    // const handleConfirmNewProduct = async (editForm) => {
    //     const newProduct = {
    //         name: editForm.name,
    //         description: editForm.description,
    //         category: editForm.category,
    //         price: editForm.price,
    //         stockQuantity: editForm.stockQuantity,
    //         powerConsumption: editForm.powerConsumption,
    //     }
    //     try {
    //         const response = await AddProduct(newProduct);
    //         console.log('Success adding!: ', response);
    //     } catch (err) {
    //         setError(err);
    //         console.error('Error adding new product, details: ', error)
    //     }
    // }

    return (
        <div>
            {!user || role === 'client' ? (
                <h2>products in stock:</h2>
            ) : (
                <h2>Product Manager for ADMINS</h2>
            )}

            <Container>
                {role && (role === 'admin' || role === 'superadmin') && (
                    <><Button onClick={handleAdd}>Add product</Button><br></br></>
                )}
                <br></br>

                <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">All Categories</option>
                    <option value="CPU">CPU</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="RAM">RAM</option>
                    <option value="Storage">Storage</option>
                    <option value="GPU">GPU</option>
                    <option value="PSU">PSU</option>
                    <option value="Case">Case</option>
                </select>

                <Row>
                    {filteredProducts.map((product) => (
                        <Col md={6} lg={4} className="mb-3" key={product.id}>
                            <br></br>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Description:</strong> {product.description}<br />
                                        <strong>Category:</strong> {product.category}<br />
                                        <strong>Price:</strong> ${product.price}<br />
                                        <strong>Stock:</strong> {product.stockQuantity}<br />
                                        <strong>Power:</strong> {product.powerConsumption} Watts
                                    </Card.Text>
                                    {!user || role === 'client' ? (
                                        <>
                                            <div className="mb-2">
                                                <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                                                <input
                                                    id={`quantity-${product.id}`}
                                                    type="number"
                                                    min="1"
                                                    max={product.stockQuantity}
                                                    value={quantities[product.id] || 1}
                                                    onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value, 10))}
                                                    style={{ width: "100%", maxWidth: "100px" }}
                                                />
                                            </div>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleAddToCart(product.id)}
                                            >
                                                Add to cart
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                handleEdit(product);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal}>
                <ModalHeader>
                    {selectedProduct ? (
                        <Modal.Title>Edit Product</Modal.Title>
                    ) : (
                        <Modal.Title>Add new product</Modal.Title>
                    )}
                    <CloseButton onClick={() => { setShowModal(false) }}></CloseButton>
                </ModalHeader>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter product name"
                                        isInvalid={!!errors.name} // Muestra error si hay
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter product description"
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={editForm.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter product price"
                                        isInvalid={!!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="stockQuantity">
                                    <Form.Label>Stock Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="stockQuantity"
                                        value={editForm.stockQuantity}
                                        onChange={handleInputChange}
                                        placeholder="Enter product stock"
                                        isInvalid={!!errors.stockQuantity}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.stockQuantity}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        value={editForm.category}
                                        onChange={handleInputChange}
                                        placeholder="Enter product category"
                                        isInvalid={!!errors.category}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.category}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="powerConsumption">
                                    <Form.Label>Power Consumption</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="powerConsumption"
                                        value={editForm.powerConsumption}
                                        onChange={handleInputChange}
                                        placeholder="Enter product power consumption"
                                        isInvalid={!!errors.powerConsumption}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.powerConsumption}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <ModalFooter>
                    {selectedProduct ? (
                        <Button variant="primary" onClick={() => { handleEditSave(editForm) }}>Save Changes</Button>
                    ) : (<Button variant="secondary" onClick={() => handleConfirmNewProduct(editForm)}>CONFIRM New Product </Button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
};

Products.propTypes = {
    selectedCategory: PropTypes.string,
}


export default Products;
