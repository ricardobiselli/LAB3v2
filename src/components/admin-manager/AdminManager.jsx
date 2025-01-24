import { GetAdmins, UpdateAdmin } from "../../api-connection/ApiEndpoints";
import { CloseButton, Container, Modal, Card, Button, Row, Col, ModalHeader, ModalFooter, Form } from "react-bootstrap";
import { useEffect, useState } from "react";


const AdminManager = () => {

    const [admins, setAdmins] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [editForm, setEditForm] = useState({
      
        userName: '',
        email: '',
    });

    useEffect(() => {

        const fetchAdmins = async () => {
            try {
                const response = await GetAdmins();
                setAdmins(response.data || []);
            } catch (error) {
                console.error('fetching admins failed, details: ', error);
            }
        };
        fetchAdmins();

    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleEdit = (admin) => {
        setSelectedAdmin(admin);
        setEditForm({
            userName: admin.userName,
            email: admin.email,
            password: admin.password,
        });
        setShowModal(true);
    };

    const handleSaveEditAdmin = async (editForm) => {
        const adminToUpdate = {
            id: selectedAdmin.id,
            userName: editForm.userName,
            email: editForm.email,
            password: editForm.password,
        }
        try {
            const response = await UpdateAdmin(adminToUpdate);
            console.log('Success updating!: ', response);

            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin.id === adminToUpdate.id ? adminToUpdate : admin
                )
            );

        } catch (error) { console.error('error, details: ', error); }

        setShowModal(false);
    };

    return (
        <div>
            <h1>Admin Manager</h1>

            <Container>
                <Row>

                    {admins.map((admin) => (
                        <Col md={6} lg={4} className="mb-3" key={admin.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{admin.id}</Card.Title>
                                    <Card.Text>
                                        <strong>username:</strong> {admin.userName} <br />
                                        <strong>email:</strong> {admin.email}<br />
                                        <strong>password:</strong> {admin.password}<br />



                                    </Card.Text>

                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            handleEdit(admin);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal}>
                <ModalHeader>
                    <Modal.Title>Edit Admin</Modal.Title>
                    <CloseButton onClick={() => { setShowModal(false) }}></CloseButton>
                </ModalHeader>
                <Modal.Body>
                    {selectedAdmin && (
                        <Card>
                            <Card.Body>
                                <Form>
                                    

                                    

                                    

                                    <Form.Group className="mb-3">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="userName"
                                            value={editForm.userName}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="password"
                                            value={editForm.password}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
                </Modal.Body>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { handleSaveEditAdmin(editForm) }}>Save Changes</Button>
                </ModalFooter>
            </Modal>




        </div>
    );
};
export default AdminManager;

