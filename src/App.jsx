import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from './components/product-list/Products'
import './App.css'
import ClientManager from "./components/client-manager/ClientManager";
import Login from "./components/login/Login";
import { AuthProvider } from "./services/authentication/AuthContext";
import Home from "./components/home-page/HomePage";
import Header from "./components/header/Header";
import AdminManager from "./components/admin-manager/AdminManager";
import ClientRegistration from "./components/client-registration/ClientRegistration";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";
import Orders from "./components/orders/Orders";
import AllOrders from "./components/all-orders/AllOrders";
import ProductCard from "./components/products/ProductCard";
import ProductList from "./components/products/ProductList";
import UserProfile from "./components/user-profile/UserProfile";
// import ProtectedRoute from "./services/protected-routes/ProtectedRoutes";

const App = () => {
  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Products" element={<Products />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<ClientRegistration />} />
                <Route path="cart" element={<ShoppingCart />} />
                <Route path="adminmanager" element={<AdminManager />} />

                <Route path="clientmanager" element={<ClientManager />} />
                <Route path="myorders" element={<Orders />} />
                <Route path="allorders" element={<AllOrders />} />               
                 <Route path="productcard" element={<ProductCard />} />
                 <Route path="productlist" element={<ProductList />} />
                 <Route path="userprofile" element={<UserProfile />} />







                {/* <Route
                  path="clientmanager"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                      <ClientManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="adminmanager"
                  element={
                    <ProtectedRoute allowedRoles={['superadmin']}>
                      <AdminManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ShoppingCart />
                    </ProtectedRoute>
                  }
                /> */}


              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;