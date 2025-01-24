import { useEffect, useState } from "react";
import { GetProducts } from "../../api-connection/ApiEndpoints";
import ProductCard from "./ProductCard";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await GetProducts();
            setProducts(response);
            console.log('response: ', response);

        }
        fetchProducts();
    }, []);

    return (
        <ul>
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    product={product}
                />
            ))}
        </ul>
    )

}

export default ProductList;