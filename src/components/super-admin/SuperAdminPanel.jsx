import { Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../services/authentication/AuthContext";
const SuperAdminPanel = () => {
    const { user, role } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleAddClient = () => {
        console.log("Redirect to add client page/modal");
        navigate('/addclient')
    };

    const handleEditClient = () => {
        console.log("Show client list for editing/deleting");
        navigate('/ClientManager')
    };

    const handleAddProduct = () => {
        console.log("Redirect to add product page/modal");
        navigate('/addnewproduct')
    };


    const handleEditProduct = () => {
        navigate('/ProductList  ')
    };

    const handleAddAdmin = () => {
        navigate('/adminlist')
    };

    return (
        <div>
            {user && role === "admin" && (
                <div className="container">
                    <h1 className="display-4 mb-3">
                        Hi {user.userName}!, Welcome to the admin panel
                    </h1>
                    <h2>  <Button variant="primary" onClick={handleAddAdmin}>
                        CREATE NEW ADMIN
                    </Button></h2>

                    <h2>
                        <Button variant="primary" onClick={handleAddClient}>
                            Add new client
                        </Button>
                    </h2>
                    <h2>
                        <Button variant="primary" onClick={handleAddProduct}>
                            Add new product
                        </Button>
                    </h2>
                    <h2>
                        <Button variant="primary" onClick={handleEditClient}>
                            Edit or Delete existing clients
                        </Button>
                    </h2>
                    <h2>
                        <Button variant="primary" onClick={handleEditProduct}>
                            Edit or Delete existing products
                        </Button>
                    </h2>
                </div>
            )}
        </div>)



};

export default SuperAdminPanel;