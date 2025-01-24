import api from './ApiBaseConnection';

export const AddProductToCart = async (id, selectedQuantity) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("Token not found");
        throw new Error("Token not found");
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const response = await api.post(
        '/ShoppingCart/Add-Product-To-Cart',
        { productId: id, quantity: selectedQuantity },
        { headers }
    );

    return response;
};

//listo
export const GetCartFromClient = async (clientId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found.");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const response = await api.get(`/ShoppingCart/Get-Cart-From-Client?clientId=${clientId}`, { headers });
    return response.data; // Solo devolvemos los datos si la respuesta es exitosa
};

//listo
export const GetProducts = async () => {
    const response = await api.get('/Products/Get-All');
    return response.data;
};

//listo
export const PlaceAnOrderFromCartContent = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    const response = await api.post('/Orders/Place-Order', {}, { headers });
    return response;

};

export const RemoveItemFromCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const data = { productId, quantity }; // The correct body for the request

    console.log('this is the data before the response: ', data);

    const response = await api.delete('/ShoppingCart/Remove-Product-From-Cart', {
        headers,
        data, // Include the body here as part of the configuration object
    });

    return response;
};

export const GetClient = async(id)=>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const response = api.get(`/Clients/Get-One${id}`, {headers});
    return response;
}



// export const AddProductToCart = async (id, selectedQuantity) => {
//     const token = localStorage.getItem('token'); 

//     if (!token) {
//         console.log("Token not found");
//         throw new Error("Token not found");
//     }

//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     };

//     const response = await api.post(
//         '/ShoppingCart/Add-Product-To-Cart',
//         { productId: id, quantity: selectedQuantity },
//         { headers }
//     );

//     return response;
// };

export const GetAllOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    const response = await api.get('/Orders/Get-All-Orders-For-Admins', { headers });
    return response;

};

export const DeleteClient = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    const response = await api.delete(`/Clients/Delete/${id}`, { headers });

    return response;

};



// export const GetProducts = async (category) => {
//     const url = category
//         ? `/Products/Get-All-By-Category?category=${encodeURIComponent(category)}`
//         : `/Products/Get-All`;

//     const response = await api.get(url);
//     return response;
// };

export const GetMyOrders = async () => {
    const token = localStorage.getItem('token'); // Verifica si el token está presente

    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asegúrate de que el token se agregue correctamente
    };
    try {
        const response = await api.get('/Orders/Get-My-Orders', { headers });
        return response;
    } catch (error) {
        console.error('Error fetching clients orders, details: ', error);
        throw error;
    }
};


export const AddProduct = async (newProduct) => {
    const token = localStorage.getItem('token'); // Verifica si el token está presente

    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asegúrate de que el token se agregue correctamente
    };

    const response = await api.post('/Products/Add-Product', newProduct, { headers });
    return response;

};

//listo
export const UpdateProduct = async (productToUpdate) => {
    console.log('sending this to the backend:', productToUpdate);
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token not found");
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const response = await api.put('/Products/Update-Product', productToUpdate, { headers });
    return response;
};

export const UpdateClient = async (clientToUpdate) => {
    console.log('preparando para enviar al backend:', clientToUpdate);  // Verifica que el objeto sea correcto


    const token = localStorage.getItem('token'); // Verifica si el token está presente

    if (!token) {
        console.error("Token no encontrado");
        return; // Si el token no está presente, no procedas con la solicitud
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asegúrate de que el token se agregue correctamente
    };

    try {
        console.log('last line before response from API')
        const response = await api.put('/Clients/Update', clientToUpdate, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar el cliente, detalles:  ', error);
    }

}

export const DeleteProduct = async () => {
    const response = await api.get('/Products/Delete-Product')

    return response;
}


export const GetClients = async () => {
    console.log("Obteniendo clientes...");

    const token = localStorage.getItem('token'); // Verifica si el token está presente

    if (!token) {
        console.error("Token no encontrado");
        return; // Si el token no está presente, no procedas con la solicitud
    }

    const headers = {
        'Authorization': `Bearer ${token}` // Asegúrate de incluir el token en la cabecera
    };

    try {
        const response = await api.get('/Clients/Get-All', { headers });
        console.log("Clientes obtenidos con éxito:", response.data);
        return response;
    } catch (error) {
        console.error('Error al obtener clientes, detalles:', error);
        throw error; // Opcional: para propagar el error a quien llame esta función
    }
};


export const GetAdmins = async () => {
    console.log("Obteniendo admins...");

    const token = localStorage.getItem('token'); // Verifica si el token está presente

    if (!token) {
        console.error("Token no encontrado");
        return; // Si el token no está presente, no procedas con la solicitud
    }

    const headers = {
        'Authorization': `Bearer ${token}` // Asegúrate de incluir el token en la cabecera
    };

    try {
        const response = await api.get('/Admins/Get-All', { headers });
        console.log("Admins obtenidos con éxito:", response.data);
        return response;
    } catch (error) {
        console.error('Error al obtener los admins, detalles:', error);
        throw error; // Opcional: para propagar el error a quien llame esta función
    }
};

export const UpdateAdmin = async (adminToUpdate) => {
    console.log('preparando para enviar al backend:', adminToUpdate);  // Verifica que el objeto sea correcto


    const token = localStorage.getItem('token'); // Verifica si el token está presente

    if (!token) {
        console.error("Token no encontrado");
        return; // Si el token no está presente, no procedas con la solicitud
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asegúrate de que el token se agregue correctamente
    };

    try {
        console.log('last line before response from API')
        const response = await api.put('/Admins/Update', adminToUpdate, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar el admin, detalles:  ', error);
    }

}

//listo
export const ClientSignUp = async (clientSigningUp) => {
    console.log('sending this to backend: ', clientSigningUp);
    const response = await api.post('/Clients/Register-Client', clientSigningUp);
    return response;
};


export const AuthenticationService = async (userNameOrEmail, password) => {
    const response = await api.post('/authentication/Authenticate',
        {
            userNameOrEmail: userNameOrEmail,
            password: password,
        },
    );
    if (response.status === 200) {
        const data = response.data;
        console.log('Login success!', data)
        return data;
    } else {
        console.log('login failed :(')
        return null;
    }

}

export const GetCategories = async () => {
    try {
        const response = await api.get('/products/categories');
        return response;
    } catch (error) {
        console.error('Error fetching categories, details: ', error);
        throw error;
    }


}
