import { useContext } from "react";
import Products from "../product-list/Products";
import AuthContext from "../../services/authentication/AuthContext";

const Home = () => {
    const { user, role } = useContext(AuthContext);
    console.log(user);
    console.log(role);

    return (
        <>
            {role != "admin" && role != "superadmin" ? (
                <>
                    {/* Banner Image Section */}
                    <div className="w-100 mb-4" style={{ height: '400px' }}>
                        <img
                            src="/src/images/portada.png" // Asegúrate de poner tu imagen en la carpeta public
                            alt="Build your PC"
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>

                    {/* Welcome Section */}
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-lg-8 mx-auto text-center">
                                <h1 className="display-4 mb-3">Welcome</h1>
                                <h2 className="lead text-muted">
                                    Build your PC with our products!
                                </h2>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <Products />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Admin View
                <div className="container-fluid py-5 bg-light">
                    {/* Banner Image for Admin */}
                    <div className="w-100 mb-4" style={{ height: '300px' }}>
                        <img
                            src="/admin-banner.jpg" // Puedes usar una imagen diferente para admins
                            alt="Admin Dashboard"
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>

                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-lg-8 mx-auto text-center">
                                <h1 className="display-4 mb-3">Bienvenido {user.userName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Home;
