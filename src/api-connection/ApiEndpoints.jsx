import api from './ApiBaseConnection';

export const    AddProductToCart = async (id, selectedQuantity) => {
    const response = await api.post('/ShoppingCart/Add-Product-To-Cart', {
        productId: id,
        quantity: selectedQuantity,
    });
    return response.data;
};

export const GetCartFromClient = async (clientId) => {
    const response = await api.get(`/ShoppingCart/Get-Cart-From-Client?clientId=${clientId}`);
    return response.data;
};

export const GetProducts = async () => {
    const response = await api.get('/Products/Get-All');
    console.log("API Response:", response.data); 
    const allProducts = response.data.$values || [];
    console.log("Products List:", allProducts); 
    return response.data;
};

export const PlaceAnOrderFromCartContent = async () => {
    const response = await api.post('/Orders/Place-Order', {});
    return response.data;
};

export const RemoveItemFromCart = async (productId, quantity) => {
    const response = await api.delete('/ShoppingCart/Remove-Product-From-Cart', {
        data: { productId, quantity },
    });
    return response.data;
};

export const GetClient = async (id) => {
    const response = await api.get(`/Clients/Get-One/${id}`);
    return response.data;
};

export const GetAllOrders = async () => {
    const response = await api.get('/Orders/Get-All-Orders-For-Admins');
    return response.data;
};

export const DeleteClient = async (id) => {
    const response = await api.delete(`/Clients/Delete/${id}`);
    return response.data;
};

export const GetMyOrders = async () => {
    const response = await api.get('/Orders/Get-My-Orders');
    return response.data;
};

export const AddProduct = async (newProduct) => {
    const response = await api.post('/Products/Add-Product', newProduct);
    return response.data;
};

export const UpdateProduct = async (productToUpdate) => {
    console.log('Sending this to the backend:', productToUpdate);
    const response = await api.put('/Products/Update-Product', productToUpdate);
    return response.data;
};

export const UpdateClient = async (clientToUpdate) => {
    console.log('Preparing to send to the backend:', clientToUpdate);
    const response = await api.put('/Clients/Update', clientToUpdate);
    return response.data;
};

export const DeleteProduct = async (productId) => {
    const response = await api.delete(`/Products/Delete-Product/${productId}`);
    return response.data;
};

export const GetClients = async () => {
    const response = await api.get('/Clients/Get-All');
    return response.data;
};

export const GetAdmins = async () => {
    const response = await api.get('/Admins/Get-All');
    return response.data;
};

export const UpdateAdmin = async (adminToUpdate) => {
    console.log('Preparing to send to the backend:', adminToUpdate);
    const response = await api.put('/Admins/Update', adminToUpdate);
    return response.data;
};

export const ClientSignUp = async (clientSigningUp) => {
    console.log('Sending this to the backend:', clientSigningUp);
    const response = await api.post('/Clients/Register-Client', clientSigningUp);
    return response.data;
};

export const AuthenticationService = async (userNameOrEmail, password) => {
    const response = await api.post('/authentication/Authenticate', {
        userNameOrEmail,
        password,
    });

    console.log(response.status === 200 ? 'Login successful!' : 'Login failed :(');
    return response.data;
};

export const GetCategories = async () => {
    const response = await api.get('/products/categories');
    return response.data;
};

export const AddAdmin = async () => {
    const response = await api.post('/Admins/Create-New-Admin');
    return response.data;
}

export const DeleteAdmin = async (adminId)=>{
    const response = await api.delete(`/Admins/Delete/'${adminId}`)
    return response.data;
}


