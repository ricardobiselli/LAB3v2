import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { CreateAdmin } from "../../api-connection/ApiEndpoints";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
    const navigate = useNavigate();
   
    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminData = {
        
            userName: userNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            console.log(adminData);
            await CreateAdmin(adminData);
            alert("Admin added successfully!"); 
            e.target.reset(); 
            navigate('/')
                } catch {
            alert("Failed to add admin. Please try again."); 
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">Add New Admin</h1>
            <Form onSubmit={handleSubmit}>
           

               

              
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
                    Add Admin
                </Button>
            </Form>
        </div>
    );
};

export default AddAdmin;
