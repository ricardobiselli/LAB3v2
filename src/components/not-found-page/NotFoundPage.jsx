import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate("/"), 3000); 
    }, [navigate]);

    return <Alert variant="danger">We can not find the page you are looking for... Redirecting to home.</Alert>;
};

export default NotFoundPage;
