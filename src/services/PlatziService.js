import { useHttp } from "../hooks/https.hook";

const usePlatziService = () => {
    const { request } = useHttp();

    const _apiBase = 'https://api.escuelajs.co/api/v1/';

    const createItem = async (endpoint, data) => {
        const body = JSON.stringify(data);
        const res = await request(`${_apiBase}${endpoint}`, 'POST', body);
        return res;
    }

    const updateItem = async (endpoint, id, data) => {
        const body = JSON.stringify(data);
        const res = await request(`${_apiBase}${endpoint}/${id}`, 'PUT', body);
        return res;
    }

    const deleteItem = async (endpoint, id) => {
        const res = await request(`${_apiBase}${endpoint}/${id}`, 'DELETE');
        return res;
    }

    const getAllItems = async (endpoint) => {
        const res = await request(`${_apiBase}${endpoint}`);
        return res;
    }

    const getItem = async (endpoint, id) => {
        const res = await request(`${_apiBase}${endpoint}/${id}`);
        return res;
    }

    const filterProducts = async (filters) => {
        const query = new URLSearchParams(filters).toString();
        const res = await request(`${_apiBase}products/?${query}`);
        return res;
    };
    
    const getProductsByCategory = async (id, limit = 5, offset = 0) => {
        const res = await request(`${_apiBase}categories/${id}/products?limit=${limit}&offset=${offset}`);
        return res;
    }

    return {
        getAllProducts: () => getAllItems('products'),
        getProduct: (id) => getItem('products', id),
        getAllCategories: () => getAllItems('categories'),
        getCategory: (id) => getItem('categories', id),
        getAllUsers: () => getAllItems('users'),
        getUser: (id) => getItem('users', id),
        addProduct: (data) => createItem('products', data),
        updateProduct: (id, data) => updateItem('products', id, data),
        deleteProduct: (id) => deleteItem('products', id),
        addCategory: (data) => createItem('categories', data),
        updateCategory: (id, data) => updateItem('categories', id, data),
        deleteCategory: (id) => deleteItem('categories', id),
        addUser: (data) => createItem('users', data),
        updateUser: (id, data) => updateItem('users', id, data),
        deleteUser: (id) => deleteItem('users', id),
        checkEmail: (email) => createItem('users/is-available', { email }),
        getProductsByCategory,
        filterProducts
    };
}

export default usePlatziService;
