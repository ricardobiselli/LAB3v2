import { useContext, useState } from "react";
import { ClientSignUp } from "../../api-connection/ApiEndpoints";
import { Form, Button, Alert } from "react-bootstrap";
import AuthContext from "../../services/authentication/AuthContext";
// import useApiErrorHandler from "../../api-connection/ApiErrorHandler";

const ClientRegistration = () => {
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        dniNumber: '',
        address: '',
        userName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        dniNumber: '',
        address: '',
        email: '',
        password: ''
    });


    const { user } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        let formErrors = {};

        // Validación
        if (!editForm.firstName) {
            formErrors.firstName = 'First Name is required';
        } else if (editForm.firstName.length < 3 || editForm.firstName.length > 20) {
            formErrors.firstName = 'First Name must be between 3 and 20 characters.';
        }

        if (!editForm.lastName) {
            formErrors.lastName = 'Last Name is required';
        } else if (editForm.lastName.length < 3 || editForm.lastName.length > 20) {
            formErrors.lastName = 'Last Name must be between 3 and 20 characters.';
        }

        if (!editForm.dniNumber) {
            formErrors.dniNumber = 'DNI is required';
        } else if (!/^\d{8,9}$/.test(editForm.dniNumber)) {
            formErrors.dniNumber = 'DNI number must be 8 or 9 digits.';
        }

        if (!editForm.address) {
            formErrors.address = 'Address is required';
        } else if (editForm.address.length < 3 || editForm.address.length > 30) {
            formErrors.address = 'Address must be between 3 and 30 characters.';
        }

        if (!editForm.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
            formErrors.email = 'Invalid email format';
        }

        if (!editForm.password) {
            formErrors.password = 'Password is required';
        } else if (editForm.password.length < 3) {
            formErrors.password = 'Password must be at least 3 characters long';
        }

        // Actualiza el estado de los errores
        setErrors(formErrors);

        // Si no hay errores, proceder con el registro
        if (Object.keys(formErrors).length === 0) {
            try {
                ClientSignUp(editForm);
                setError('');
            } catch (err) {
                const errorMessage =
                    err.response?.data?.error ||
                    "An unexpected error occurred. Please try again.";
                setError(errorMessage);
                console.error("Error while registration: ", err);
            } console.log('Form submitted successfully');
        }
    };

    return (
        <Form onSubmit={handleRegistration}>

            {user ? (
                <h1>You already have an account...</h1>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <h3>Create an account!</h3>

                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={editForm.firstName}
                            placeholder="Enter your first name"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            minLength={3} // Mínimo de 3 caracteres
                            maxLength={20} // Máximo de 20 caracteres
                            isInvalid={!!errors.firstName} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName} {/* Muestra el mensaje de error si existe */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={editForm.lastName}
                            placeholder="Enter your last name"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            minLength={3} // Mínimo de 3 caracteres
                            maxLength={20} // Máximo de 20 caracteres
                            isInvalid={!!errors.lastName} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="userName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="userName"
                            value={editForm.userName}
                            placeholder="Enter a username"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            minLength={3} // Mínimo de 3 caracteres
                            maxLength={20} // Máximo de 20 caracteres
                            isInvalid={!!errors.userName} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.userName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="dniNumber">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                            type="text"
                            name="dniNumber"
                            value={editForm.dniNumber}
                            placeholder="Enter DNI (must be 8 or 9 digits)"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            pattern="^\d{8,9}$" // DNI debe ser 8 o 9 dígitos
                            isInvalid={!!errors.dniNumber} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dniNumber}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={editForm.address}
                            placeholder="Enter address"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            minLength={3} // Mínimo de 3 caracteres
                            maxLength={30} // Máximo de 30 caracteres
                            isInvalid={!!errors.address} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editForm.email}
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            isInvalid={!!errors.email} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={editForm.password}
                            placeholder="Enter your password"
                            onChange={handleInputChange}
                            required // Campo obligatorio
                            minLength={3} // Mínimo de 3 caracteres
                            maxLength={100} // Máximo de 100 caracteres
                            isInvalid={!!errors.password} // Mostrar error si es inválido
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Button variant="primary" type="submit" className="mt-3">
                        Register
                    </Button>
                </>
            )}
        </Form>
    );
};

export default ClientRegistration;