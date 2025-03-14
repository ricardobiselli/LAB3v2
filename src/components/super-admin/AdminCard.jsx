import { Card, Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { DeleteAdmin, UpdateAdmin } from "../../api-connection/ApiEndpoints";
// import UseAdmins from "./UseAdmins";

const AdminCard = ({ admin, fetchAdmins }) => {
    const [showModal, setShowModal] = useState(false);
    const [adminForm, setAdminForm] = useState({
        id: admin.id,
        userName: '',
        password: '',
        email: '',
    });

    const handleEditAdmin = () => {
        setAdminForm({
            id: admin.id,
            userName: admin.userName,
            password: admin.password,
            email: admin.email,
        });
        setShowModal(true);
    };

    const handleDeleteAdmin = async (id) => {
        try {
            let confirmMessage =
                confirm("Are you sure you want to delete this admin?");
            if (confirmMessage) {
                await DeleteAdmin(id);
                await fetchAdmins();
            }

        }
        catch (err) {
            console.error(err.message);
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminForm((prevAdminForm) => ({
            ...prevAdminForm,
            [name]: value,
        }));
        console.log("Updated Admin Form:", { [name]: value });
    };



    const handleSubmitEditedAdmin = async (e) => {
        e.preventDefault();
        try {
            console.log("Updated Client:", adminForm);
            await UpdateAdmin(adminForm);
            await fetchAdmins();
            setShowModal(false);
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <Col md={4} className="mb-4">
            <Card>
                <Card.Header>Admin ID: {admin.id}</Card.Header>
                <Card.Body>
                    <p>Username: {admin.userName}</p>
                    <p>Email: {admin.email}</p>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleEditAdmin} className="me-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteAdmin(admin.id)}>Delete</Button>
                </Card.Footer>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEditedAdmin}>

                        <Form.Group controlId="formUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="userName" value={adminForm.userName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={adminForm.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" name="password" value={adminForm.password} onChange={handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
};


AdminCard.propTypes = {
    admin: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
    fetchAdmins: PropTypes.func.isRequired,
};

export default AdminCard;