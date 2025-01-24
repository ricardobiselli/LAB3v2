import { GetClients, UpdateClient, DeleteClient } from "../../api-connection/ApiEndpoints";
import { CloseButton, Container, Modal, Card, Button, Row, Col, ModalHeader, ModalFooter, Form } from "react-bootstrap";
import { useEffect, useState } from "react";


const ClientManager = () => {

    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        dniNumber: '',
        address: '',
        userName: '',
        email: '',
    });
    const [errors, setErrors] = useState({});


    useEffect(() => {

        const fetchClients = async () => {
            try {
                const response = await GetClients();
                setClients(response.data || []);
            } catch (error) {
                console.error('fetching clients failed, details: ', error);
            }
        };
        fetchClients();

    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setEditForm({
            firstName: client.firstName,
            lastName: client.lastName,
            dniNumber: client.dniNumber,
            address: client.address,
            userName: client.userName,
            email: client.email,
        });
        setShowModal(true);
    };

    const handleSaveEditClient = async (editForm) => {
        const clientToUpdate = {
            id: selectedClient.id,
            userName: editForm.userName,
            email: editForm.email,
            firstName: editForm.firstName,
            lastName: editForm.lastName,
            dniNumber: editForm.dniNumber,
            address: editForm.address,
        }



        if (!validate()) {
            return;
        }

        try {
            // Aquí iría la lógica para enviar los datos al backend
            const response = await UpdateClient(clientToUpdate);
            console.log('Success updating!: ', response);


            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.id === clientToUpdate.id ? clientToUpdate : client
                )
            );

        } catch (error) { console.error('error, details: ', error); }

        setShowModal(false);
    };

    const handleDelete = async (id) => {
        console.log('client to be deleted: ', id);
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                await DeleteClient(id);
                setClients((prevClients) =>
                    prevClients.filter((client) => client.id !== id)
                );
                setShowModal(false);

            } catch (error) {
                console.error("Error deleting client:", error);
            }
        }
    }

    const validate = () => {
        const newErrors = {};

        if (!editForm.userName || editForm.userName.length < 3 || editForm.userName.length > 20) {
            newErrors.userName = "Username must be between 3 and 20 characters.";
        }

        if (!editForm.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(editForm.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!editForm.firstName || editForm.firstName.length < 3 || editForm.firstName.length > 20) {
            newErrors.firstName = "First Name must be between 3 and 20 characters.";
        }

        if (!editForm.lastName || editForm.lastName.length < 3 || editForm.lastName.length > 20) {
            newErrors.lastName = "Last Name must be between 3 and 20 characters.";
        }

        if (!editForm.dniNumber || !/^\d{8,9}$/.test(editForm.dniNumber)) {
            newErrors.dniNumber = "DNI number must be 8 or 9 digits.";
        }

        if (!editForm.address || editForm.address.length < 3 || editForm.address.length > 30) {
            newErrors.address = "Address must be between 3 and 30 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    return (
        <div>
            <h1>Client Manager for ADMINS</h1>

            <Container>
                <Row>

                    {clients.map((client) => (
                        <Col md={6} lg={4} className="mb-3" key={client.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{client.id}</Card.Title>
                                    <Card.Text>
                                        <strong>First Name:</strong> {client.firstName}<br />
                                        <strong>Last Name:</strong> {client.lastName}<br />
                                        <strong>DNI number:</strong> {client.dniNumber}<br />
                                        <strong>adress:</strong> {client.address} <br />
                                        <strong>username:</strong> {client.userName} <br />
                                        <strong>email:</strong> {client.email}<br />


                                    </Card.Text>

                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            handleEdit(client);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <hr></hr>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            handleDelete(client.id);
                                            console.log('id of client about to be deleted: ', client.id);
                                        }}
                                    >
                                        DELETE!
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal}>
                <ModalHeader>
                    <Modal.Title>Edit Client</Modal.Title>
                    <CloseButton onClick={() => { setShowModal(false) }}></CloseButton>
                </ModalHeader>
                <Modal.Body>
                    {selectedClient && (
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={editForm.firstName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={editForm.lastName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>DNI number</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="dniNumber"
                                            value={editForm.dniNumber}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.dniNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dniNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            value={editForm.address}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="userName"
                                            value={editForm.userName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.userName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form>

                            </Card.Body>
                        </Card>
                    )}
                </Modal.Body>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { handleSaveEditClient(editForm) }}>Save Changes</Button>
                </ModalFooter>
            </Modal>




        </div>
    );
};
export default ClientManager;

