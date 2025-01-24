import { useState, useContext } from "react";
import AuthContext from "../../services/authentication/AuthContext";
import {Button, Card, CardBody, CardFooter, CardHeader, CloseButton } from "react-bootstrap";
import PropTypes from "prop-types";
import { AddProductToCart } from "../../api-connection/ApiEndpoints";

const ProductCard = ({ product }) => {
    const { role } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [error, setError] = useState(null);

    // console.log('selectted quantity: ', selectedQuantity)
    ;
    const handleEdit = () => {
        setEditMode(true);
    }

    const handleAddToCart = async (id, selectedQuantity) => {
        try {
            console.log('sending this item to cart: ', id, 'with quantity', selectedQuantity);

            await AddProductToCart(id, selectedQuantity)

        } catch (err) {
            setError(err.message);
            console.log('Error: ', error);
        }
    }



    return (
        <div>


            <Card>
                <CardHeader>
                    <h5>{product.name}</h5>
                    <CloseButton />
                </CardHeader>
                <CardBody>
                    <p>
                        name: {product.name} <br />
                        category: {product.category} <br />
                        price: {product.price} <br />
                        description: {product.description} <br />
                        available stock: {product.stockQuantity} <br />
                        Power: {product.powerConsumption}
                    </p>
                    <label>
                        Quantity:{" "}
                        <input
                            type="number"
                            min={1}
                            max={product.stockQuantity}
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(e.target.value)}
                        />
                    </label>
                </CardBody>
                <CardFooter>
                    {editMode && role === "admin" ? (
                        <Button onClick={handleEdit}>Edit</Button>
                    ) : (
                        <Button onClick={() => handleAddToCart(product.id, selectedQuantity)}>
                            Add to Cart
                        </Button>
                    )}
                </CardFooter>
            </Card>
            <br />
        </div>
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
    }).isRequired
};



export default ProductCard;