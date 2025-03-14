import { useContext, useState } from "react";
import AuthContext from "../../services/authentication/AuthContext";
import ProductList from "../products/ProductList";
import AdminPanel from "../admin/AdminPanel";
import SuperAdminPanel from "../super-admin/SuperAdminPanel";
const Home = () => {
    const { user, role, loading } = useContext(AuthContext);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleCategoryChange = (category) => {
        console.log("Category Changed to:", category);
        setSelectedCategory(category);
    };



    return (
        <>
            {user && role === "superadmin" ? (
                <div className="container-fluid py-5 bg-light">
                    <div className="container">
                        <div className="row mb-5">
                            <SuperAdminPanel /> 
                        </div>
                    </div>
                </div>
            ) : role === "admin" ? (
                <div className="container-fluid py-5 bg-light">
                    <div className="container">
                        <div className="row mb-5">
                            <AdminPanel /> 
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-100 mb-4" style={{ height: "400px" }}>
                        <img
                            src="/src/images/portada.webp"
                            alt="Build your PC"
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>

                    <div className="container">
                        <div className="row mb-5">
                            {!loading && user && (
                                <div className="col-lg-8 mx-auto text-center">
                                    <h1 className="display-4 mb-3">Welcome! {user.firstName}</h1>
                                    <h2 className="lead text-muted">
                                        Build your custom PC with our products...
                                    </h2>
                                </div>
                            )}
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <ProductList
                                            selectedCategory={selectedCategory}
                                            onCategoryChange={handleCategoryChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
