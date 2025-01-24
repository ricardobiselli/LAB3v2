import {  useEffect, useState } from "react";
// import AuthContext from "../../services/authentication/AuthContext";
import { GetCartFromClient, PlaceAnOrderFromCartContent , RemoveItemFromCart} from "../../api-connection/ApiEndpoints";
// import useApiErrorHandler from "../../api-connection/ApiErrorHandler";
import {  Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
// import AuthContext from "../../services/authentication/AuthContext";

const ShoppingCart = () => {
    // const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const totalCart = cart.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    // const {user} = useContext(AuthContext);

    
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const products = await GetCartFromClient("client-id-example");
                setCart(products.shoppingCartProducts || []);
            } catch (err) {
                setError(err.message); 
            }
        };
        
        fetchCart();
    }, [cart]);
    
    const handleConfirmOrder = async () => {
        try {
            await PlaceAnOrderFromCartContent();
            alert("Order confirmed successfully!");

            navigate("/myorders")
        } catch (err) {
            setError(err.message);
        };
    };

    const handleRemoveItemFromCart = async (productId, quantity) => {
        console.log('sending this product for deletion: ', productId, 'with quantity: ', quantity);
        try {
            await RemoveItemFromCart(productId, quantity)
        }catch(err){
            setError(err.message);
            console.log('error: ', error);
        }
    }

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. THIS IS A MEESAGE FROM REACT</p>
            ) : (
                <div>
                    {cart.map((shoppingCartProduct, index) => (
                        <div key={index}>
                            <ul>
                                {/* <li>ESTE ES EL ID: {shoppingCartProduct.productId}</li> */}
                                <li>Product: {shoppingCartProduct.productName}</li>
                                <li>Quantity: {shoppingCartProduct.quantity}</li>
                                <li>Price: ${shoppingCartProduct.unitPrice}</li>
                                <li>Sub-Total: ${shoppingCartProduct.quantity * shoppingCartProduct.unitPrice}</li>
                            </ul>
                            <Button onClick={()=>handleRemoveItemFromCart(shoppingCartProduct.productId, shoppingCartProduct.quantity)}>Remove item</Button>
                        </div>
                    ))}
                    <div>
                        <h3>Total: ${totalCart}</h3>
                        {error && <div>{error}</div>}
                        <Button onClick={() => handleConfirmOrder()}>Confirm your Order</Button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ShoppingCart;
