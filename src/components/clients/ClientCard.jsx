import { Card, Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { DeleteClient, UpdateClient } from "../../api-connection/ApiEndpoints";

const ClientCard = ({ client, setRefreshTrigger, refreshTrigger }) => {
    const [showModal, setShowModal] = useState(false);
    const [clientForm, setClientForm] = useState({
        id: client.id,
        name: '',
        firstName: '',
        lastName: '',
        dniNumber: '',
        address: '',
        userName: '',
        email: '',
    });

    const handleEditClient = () => {
        setClientForm({
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            dniNumber: client.dniNumber,
            address: client.address,
            userName: client.userName,
            email: client.email,
        });
        setShowModal(true);
    };

    const handleDeleteClient = async (id) => {
        try {
            await DeleteClient(id);
            alert("Client was successfully deleted!")
        }
        catch (err) {
            console.error(err.message);
        }
        setRefreshTrigger((x)=>x + 1);

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientForm((prevClientForm) => ({
            ...prevClientForm,
            [name]: value,
        }));
        console.log("Updated clientForm:", { [name]: value });
    };
    


    const handleSubmitEditedClient = async (e) => {
        e.preventDefault();
        try {
            console.log("Updated Client:", clientForm);
            await UpdateClient(clientForm);

            setShowModal(false);
            setRefreshTrigger(refreshTrigger + 1); 
        } catch  {
            alert("Failed to update client. Please try again.");         }
    };
    return (
        <Col md={4} className="mb-4">
            <Card>
                <Card.Header>Client ID: {client.id}</Card.Header>
                <Card.Body>
                    <p>Name: {client.firstName}</p>
                    <p>Last Name: {client.lastName}</p>
                    <p>DNI Number: {client.dniNumber}</p>
                    <p>Address: {client.address}</p>
                    <p>Username: {client.userName}</p>
                    <p>Email: {client.email}</p>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleEditClient} className="me-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteClient(client.id)}>Delete</Button>
                </Card.Footer>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEditedClient}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={clientForm.firstName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={clientForm.lastName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formDniNumber">
                            <Form.Label>DNI Number</Form.Label>
                            <Form.Control type="text" name="dniNumber" value={clientForm.dniNumber} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={clientForm.address} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="userName" value={clientForm.userName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={clientForm.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
};


ClientCard.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        dniNumber: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    setRefreshTrigger: PropTypes.func.isRequired,
    refreshTrigger: PropTypes.number.isRequired,
};

export default ClientCard;