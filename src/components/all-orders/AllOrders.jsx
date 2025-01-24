import { useEffect, useState } from "react";
import { GetAllOrders } from "../../api-connection/ApiEndpoints"; // Cambié la función para obtener todas las órdenes
import { Container, Accordion, Table } from "react-bootstrap";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await GetAllOrders(); // Esta función obtiene todas las órdenes del backend
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders: ", error);
                throw error;
            }
        };
        fetchOrders();
    }, []);

    return (
        <Container className="mt-4">
            <h2>All Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Accordion>
                    {orders.map((order, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                Order placed on: {new Date(order.orderDate).toLocaleString()} - 
                                Client ID: {order.clientId} - 
                                Total Amount: ${order.totalAmount.toFixed(2)}
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderDetails.map((detail, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{detail.productName}</td>
                                                <td>{detail.quantity}</td>
                                                <td>${detail.unitPrice.toFixed(2)}</td>
                                                <td>${(detail.quantity * detail.unitPrice).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </Container>
    );
};

export default AllOrders;
