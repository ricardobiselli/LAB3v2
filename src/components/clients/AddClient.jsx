import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { ClientSignUp } from "../../api-connection/ApiEndpoints";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
    const navigate = useNavigate();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const dniNumberRef = useRef(null);
    const addressRef = useRef(null);
    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const clientData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            dniNumber: dniNumberRef.current.value,
            address: addressRef.current.value,
            userName: userNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await ClientSignUp(clientData);
            alert("Client added successfully!"); 
            e.target.reset(); 
            navigate('/')
                } catch {
            alert("Failed to add client. Please try again."); 
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">Add New Client</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={firstNameRef}
                        placeholder="3-20 characters"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={lastNameRef}
                        placeholder="3-20 characters"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="dniNumber" className="mb-3">
                    <Form.Label>DNI Number</Form.Label>
                    <Form.Control
                        type="text"
                        ref={dniNumberRef}
                        placeholder="8-9 digits (e.g., 12345678)"
                        pattern="^\d{8,9}$"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        ref={addressRef}
                        placeholder="3-30 characters"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="userName" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        ref={userNameRef}
                        placeholder="3-20 characters"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        ref={emailRef}
                        placeholder="Valid email address (e.g., example@mail.com)"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        ref={passwordRef}
                        placeholder="At least 3 characters"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Client
                </Button>
            </Form>
        </div>
    );
};

export default AddClient;
