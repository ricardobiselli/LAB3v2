import { useEffect, useState } from "react";
import { GetProducts } from "../../../api-connection/ApiEndpoints";

const useProducts = (refreshTrigger) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GetProducts();
                setProducts(response);
                setLoading(false); 
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false); 
            }
        };
        fetchProducts();
    }, [refreshTrigger]);
    return { products, loading };
};

export default useProducts;
