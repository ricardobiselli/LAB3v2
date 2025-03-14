import { Container, Row, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";
import useProducts from "./UseProducts";
import PropTypes from "prop-types";
import {  useContext } from "react";
import AdminPanel from "../admin/AdminPanel";
import AuthContext from "../../services/authentication/AuthContext";

const ProductList = ({  selectedCategory, onCategoryChange }) => {
    const { products, fetchProducts, loading } = useProducts(); 
    const { user, role } = useContext(AuthContext);

    const filteredProducts = products.filter((product) => {
        if (selectedCategory === "all") {
            return true;
        }
        return product.category === selectedCategory; 
    });
    
    return (
        <Container>
            {user && role==="admin" || role==="superadmin" && (<AdminPanel/>)}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Form.Select
                    value={selectedCategory}
                    onChange={(e) => {
                        onCategoryChange(e.target.value);
                    }}
                    className="mb-3"
                    style={{ maxWidth: "200px", margin: "0 auto" }}
                >
                    <option value="all">All Categories</option>
                    <option value="CPU">CPU</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="RAM">RAM</option>
                    <option value="Storage">Storage</option>
                    <option value="GPU">GPU</option>
                    <option value="PSU">PSU</option>
                    <option value="Case">Case</option>
                </Form.Select>
            </div>

            <Row>{!loading && filteredProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    fetchProducts={fetchProducts}
                />
            ))}

            </Row>
        </Container>
    );
};

ProductList.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired, 
};

export default ProductList;
