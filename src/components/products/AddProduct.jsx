

import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { AddProduct } from "../../api-connection/ApiEndpoints";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const stockQuantityRef = useRef(null);
    const categoryRef = useRef(null);
    const powerConsumptionRef = useRef(null);

    const categories = ["CPU", "PSU", "RAM", "Storage", "Case", "GPU", "Motherboard"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: parseFloat(priceRef.current.value),
            stockQuantity: parseInt(stockQuantityRef.current.value, 10),
            category: categoryRef.current.value,
            powerConsumption: parseFloat(powerConsumptionRef.current.value),
        };

        try {
            await AddProduct(productData);
            alert("Product added successfully!"); 
            navigate('/');
            e.target.reset(); 
        } catch {
            alert("Failed to add product. Please try again."); 
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">Add New Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={nameRef}
                        placeholder="3-20 characters"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        ref={descriptionRef}
                        placeholder="3-20 characters"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        ref={priceRef}
                        placeholder="Between 0 and 99,999"
                        step="0.01"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="stockQuantity" className="mb-3">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        ref={stockQuantityRef}
                        min={1}
                        placeholder="Between 0 and 99,999"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select ref={categoryRef} required>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="powerConsumption" className="mb-3">
                    <Form.Label>Power Consumption</Form.Label>
                    <Form.Control
                        type="number"
                        ref={powerConsumptionRef}
                        min={1}
                        placeholder="Between 0 and 999"
                        step="0.01"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>
        </div>
    );
};

export default AddNewProduct;
