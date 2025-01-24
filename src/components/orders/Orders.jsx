import { useEffect, useState } from "react";
import { GetMyOrders } from "../../api-connection/ApiEndpoints";
import { Container, Accordion, Table } from "react-bootstrap";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await GetMyOrders()
                setOrders(response.data);
            }catch(error){
                console.error('details: ', error);
                throw error;
            }

        }
        fetchOrders();
    },[])

    return (
        <Container className="mt-4">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Accordion>
                    {orders.map((order, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                Order placed on: {new Date(order.orderDate).toLocaleString()} - 
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

export default Orders;