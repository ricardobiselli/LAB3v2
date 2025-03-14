import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from "./components/login/Login";
import { AuthProvider } from "./services/authentication/AuthContext";
import Home from "./components/home-page/HomePage";
import Header from "./components/header/Header";
import ClientRegistration from "./components/clients/ClientRegistration";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";
import Orders from "./components/orders/Orders";
import ProtectedRoute from "./services/protected-routes/ProtectedRoutes";
import ClientList from "./components/clients/ClientList";
import { useState } from "react";
import ProductList from "./components/products/ProductList";
import NotFoundPage from "./components/not-found-page/NotFoundPage";
import AdminList from "./components/super-admin/AdminList";
import  AddProduct  from "./components/products/AddProduct";
import AddClient from "./components/clients/AddClient";
import AdminPanel from "./components/admin/AdminPanel";
import AddAdmin from "./components/super-admin/AddAdmin";
import ClientProfile from "./components/clients/ClientProfile";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("all"); 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); 
  };

  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<ClientRegistration />} />
                <Route path="adminmanager" element={<ProtectedRoute allowedRoles={["superadmin"]}><AdminPanel /></ProtectedRoute>} />
                <Route path="clientManager" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]}><ClientList /></ProtectedRoute>} />
                <Route path="myorders" element={<ProtectedRoute allowedRoles={["client"]}><Orders /></ProtectedRoute>} />
                <Route path="cart" element={<ProtectedRoute allowedRoles={["client", "admin", "superadmin"]}><ShoppingCart /></ProtectedRoute>} />
                <Route path="addnewproduct" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]}><AddProduct /></ProtectedRoute>} />
                <Route path="addclient" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]}><AddClient /></ProtectedRoute>} />
                <Route path="addadmin" element={<ProtectedRoute allowedRoles={["superadmin"]}><AddAdmin /></ProtectedRoute>} />
                <Route path="adminlist" element={<ProtectedRoute allowedRoles={["superadmin"]}><AdminList /></ProtectedRoute>} />
                <Route path="clientprofile" element={<ProtectedRoute allowedRoles={["client"]}><ClientProfile /></ProtectedRoute>} />
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