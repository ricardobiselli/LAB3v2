import { useContext, useState, useRef } from "react";
import { ClientSignUp } from "../../api-connection/ApiEndpoints";
import { Form, Button, Alert } from "react-bootstrap";
import AuthContext from "../../services/authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const ClientRegistration = () => {
    const [signupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        dniNumber: "",
        address: "",
        userName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const dniNumberRef = useRef(null);
    const addressRef = useRef(null);
    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (signupForm.firstName.length < 3) {
            setError("Please correct the First Name field.");
            firstNameRef.current.focus();
            return;
        }
        if (signupForm.lastName.length < 3) {
            setError("Please correct the Last Name field.");
            lastNameRef.current.focus();
            return;
        }
        if (signupForm.userName.length < 3) {
            setError("Please correct the User Name field.");
            userNameRef.current.focus();
            return;
        }
        if (!/^\d{8,9}$/.test(signupForm.dniNumber)) {
            setError("Please correct the DNI field.");
            dniNumberRef.current.focus();
            return;
        }
        if (signupForm.address.length < 3) {
            setError("Please correct the Address field.");
            addressRef.current.focus();
            return;
        }
        if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
            setError("Please correct the Email field.");
            emailRef.current.focus();
            return;
        }
        if (signupForm.password.length < 3) {
            setError("Please correct the Password field.");
            passwordRef.current.focus();
            return;
        }

        try {
            await ClientSignUp(signupForm);
            setError("");
            console.log("Form submitted successfully");
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);

        } catch (err) {
            setError(err.response?.data?.error || "An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Form onSubmit={handleRegistration} style={{ maxWidth: "500px", width: "100%" }}>
                {user ? (<h1>You already have an account...</h1>
                ) : (
                    <>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Registration successful! Please login now...</Alert>}

                        <h3>Create an account!</h3>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" placeholder="must be at least 3 characters..." value={signupForm.firstName} onChange={handleInputChange} ref={firstNameRef} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="must be at least 3 characters..." value={signupForm.lastName} onChange={handleInputChange} ref={lastNameRef} />
                        </Form.Group>
                        <Form.Group controlId="userName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="userName" placeholder="must be at least 3 characters..." value={signupForm.userName} onChange={handleInputChange} ref={userNameRef} />
                        </Form.Group>
                        <Form.Group controlId="dniNumber">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="text" name="dniNumber" placeholder="must be 8-9 numbers..." value={signupForm.dniNumber} onChange={handleInputChange} ref={dniNumberRef} />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="must be at least 3 characters..." value={signupForm.address} onChange={handleInputChange} ref={addressRef} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="must be a valid email address..." value={signupForm.email} onChange={handleInputChange} ref={emailRef} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="must be at least 3 characters..." value={signupForm.password} onChange={handleInputChange} ref={passwordRef} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Register
                        </Button>
                    </>
                )}
            </Form>
        </div>
    );

};

export default ClientRegistration;