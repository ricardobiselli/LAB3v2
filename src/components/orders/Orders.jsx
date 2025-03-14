import { useEffect, useState } from "react";
import { GetMyOrders } from "../../api-connection/ApiEndpoints";
import { Container,  Table } from "react-bootstrap";
// import AuthContext from "../../services/authentication/AuthContext";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await GetMyOrders()
                setOrders(response);
                setLoading(false);
            }catch(error){
                console.error('details: ', error);
            }

        }
        fetchOrders();
    },[])

    if (loading) return <p>please wait while loading your orders...</p>

    return (
        <Container className="mt-4">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Table striped bordered hover>
    <thead>
        <tr>
            <th>#</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        {orders.map((order, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
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
                </td>
            </tr>
        ))}
    </tbody>
</Table>

            

            )}
        </Container>
    );
};

export default Orders;