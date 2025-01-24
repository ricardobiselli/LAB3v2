// import { useState, useEffect } from 'react';
// import { GetProducts } from '../../api-connection/ApiEndpoints'; // Asegúrate de importar GetProducts

// const useProducts = (category = '') => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             setLoading(true);
//             try {
//                 const response = await GetProducts(category); // Llamada a GetProducts
//                 setProducts(response.data || []);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
           
//         };

//         fetchProducts();
//     }, [category]}); // La dependencia es category, para recargar cuando cambia

//     return { products, loading, error };
// };

// export default useProducts;
