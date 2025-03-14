import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from "./components/login/Login";
import { AuthProvider } from "./services/authentication/AuthContext";
import Home from "./components/home-page/HomePage";
import Header from "./components/header/Header";
import AdminManager from "./components/super-admin/SuperAdminPanel";
import ClientRegistration from "./components/clients/ClientRegistration";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";
import Orders from "./components/orders/Orders";
import ProtectedRoute from "./services/protected-routes/ProtectedRoutes";
import ClientList from "./components/clients/ClientList";
import { useState } from "react";
import ProductList from "./components/products/components/ProductList";
import NotFoundPage from "./components/not-found-page/NotFoundPage";
import AdminList from "./components/super-admin/AdminList";
import AddNewProduct from "./components/products/components/AddProduct";
import AddClient from "./components/clients/AddClient";

const App = () => {
  // const [searchWord, setSearchWord] = useState(""); // Controla el término de búsqueda
  const [selectedCategory, setSelectedCategory] = useState("all"); // Controla la categoría seleccionada


  // const handleSearch = (word) => {
  //   setSearchWord(word); // Actualiza el término de búsqueda
  // };

  const handleCategoryChange = (category) => {

    console.log("Category Changed to:", category); // Depuración
    setSelectedCategory(category); // Actualiza la categoría seleccionada
  };

  // console.log("App searchWord:", searchWord); 
  console.log("App selectedCategory:", selectedCategory);
  console.log("App handleCategoryChange:", handleCategoryChange);

  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <Header /*onSearch={handleSearch} */ />
          <main>
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<ClientRegistration />} />
                <Route path="adminmanager" element={<ProtectedRoute allowedRoles={["superadmin"]}><AdminManager /></ProtectedRoute>} />
                <Route path="clientManager" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]}><ClientList /></ProtectedRoute>} />
                <Route path="myorders" element={<ProtectedRoute allowedRoles={["client"]}><Orders /></ProtectedRoute>} />
                <Route path="cart" element={<ProtectedRoute allowedRoles={["client", "admin", "superadmin"]}><ShoppingCart /></ProtectedRoute>} />
                <Route path="addnewproduct" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]}><AddNewProduct /></ProtectedRoute>} />
                <Route path="addclient" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]}><AddClient /></ProtectedRoute>} />
                <Route path="productlist" element={<ProductList
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />} />
                <Route path="adminlist" element={<ProtectedRoute allowedRoles={["superadmin"]}><AdminList /></ProtectedRoute>} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;