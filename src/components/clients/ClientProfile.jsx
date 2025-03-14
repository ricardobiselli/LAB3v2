import AuthContext from "../../services/authentication/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UpdateClient, GetClient, DeleteClient } from "../../api-connection/ApiEndpoints";
import { useNavigate } from "react-router-dom";

const ClientProfile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("USERRRR: ", user);

    const [clientProfileForm, setClientProfileForm] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        dniNumber: "",
        address: "",
        email: "",
        userName: "",
    });

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await GetClient(user.sub);
                console.log("response: ", response);
                setClientProfileForm({
                    id: user.sub,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    dniNumber: response.dniNumber,
                    address: response.address,
                    email: response.email,
                    userName: response.userName,
                });
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchClient();
    }, [user.sub]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientProfileForm((prevClientForm) => ({
            ...prevClientForm,
            [name]: value,
        }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await UpdateClient(clientProfileForm);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile: ", err.message);
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            const confirmMessage = confirm("Please confirm you are deleting this account");
            if (confirmMessage) {
                await DeleteClient(id);
                logout();
                alert("Account deleted successfully!");
                navigate('/');
            }   
        } catch {
            alert("Failed to delete client. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}> {/* Adjust the width using Bootstrap's grid system */}
                    <Form onSubmit={handleSubmitForm}>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="userName"
                                placeholder="Enter username"
                                value={clientProfileForm.userName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={clientProfileForm.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Enter name"
                                value={clientProfileForm.firstName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={clientProfileForm.lastName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicDniNumber">
                            <Form.Label>DNI Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="dniNumber"
                                placeholder="Enter DNI number"
                                value={clientProfileForm.dniNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                value={clientProfileForm.address}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Update Profile
                        </Button>
                        <br />
                        <Button
                            onClick={() => handleDeleteAccount(user.sub)}
                            variant="danger"
                            className="mt-3"
                        >
                            Delete Profile
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ClientProfile;
