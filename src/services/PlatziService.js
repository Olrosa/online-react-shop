import { useHttp } from "../hooks/https.hook";

const usePlatziService = () => {
    const {request} = useHttp();

    const _apiBase = 'https://api.escuelajs.co/api/v1/';
    const _baseOffset = 0;

    const getAllProducts = async () => {
        const res = await request(`${_apiBase}products/`);
        return res.map(_transformProduct);
    }

    const getProduct = async (id) => {
        const res = await request(`${_apiBase}products/${id}`);
        return _transformProduct(res);
    }

    const getProducts = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}products?offset=${offset}&limit=10`);
        return res.map(_transformProduct);
    }

    const getProductsByCategory = async (id) => {
        const res = await request(`${_apiBase}categories/${id}/products`);
        return res;
    }

    const getAllCategories = async () => {
        const res = await request(`${_apiBase}categories/`);
        return res;
    }

    const getCategory = async (id) => {
        const res = await request(`${_apiBase}categories/${id}`);
        return res;
    }

    const getAllUsers = async () => {
        const res = await request(`${_apiBase}users/`);
        return res;
    }

    const getUser = async (id) => {
        const res = await request(`${_apiBase}users/${id}`);
        return res;
    }

    const addProduct = async (title, price, description, categoryId, images) => {
        const body = JSON.stringify({
            title,
            price,
            description,
            categoryId,
            images
        });

        const res = await request(`${_apiBase}products/`, 'POST', body);
        return res;
    }

    const addCategory = async (name, image) => {
        const body = JSON.stringify({name, image});

        const res = await request(`${_apiBase}categories/`, 'POST', body);
        return res;
    }

    const addUser = async (name, email, password, avatar) => {
        const body = JSON.stringify({
            name,
            email,
            password,
            avatar
        });

        const res = await request(`${_apiBase}users/`, 'POST', body);
        return res;
    }

    const updateProduct = async (id, updatedData) => {
        const body = JSON.stringify(updatedData);

        const res = await request(`${_apiBase}products/${id}`, 'PUT', body);
        return res;
    }

    const updateCategory = async (id, updatedData) => {
        const body = JSON.stringify(updatedData);

        const res = await request(`${_apiBase}categories/${id}`, 'PUT', body);
        return res;
    }

    const updateUser = async (id, updatedData) => {
        const body = JSON.stringify(updatedData);

        const res = await request(`${_apiBase}users/${id}`, 'PUT', body);
        return res;
    }

    const deleteProduct = async (id) => {
        const res = await request(`${_apiBase}products/${id}`, 'DELETE');
        return res;
    }

    const deleteCategory = async (id) => {
        const res = await request(`${_apiBase}categories/${id}`, 'DELETE');
        return res;
    }

    const deleteUser = async (id) => {
        const res = await request(`${_apiBase}users/${id}`, 'DELETE');
        return res;
    }

    const checkEmail = async (email) => {
        const body = JSON.stringify(email);

        const res = await request(`${_apiBase}users/is-available`, 'POST', body);
        return res;
    }

    const _transformProduct = (item) => {
        return {
            id: item.id,
            title: item.title,
            description: item.description ? item.description : 'There is no description for this product',
            price: item.price,
            category: item.category,
            images: item.images
        }
    }


    return {
        getAllProducts, 
        getProduct, 
        getProducts, 
        getAllCategories, 
        getCategory, 
        getAllUsers, 
        getUser, 
        addProduct, 
        deleteProduct, 
        updateProduct, 
        addUser, 
        addCategory,
        updateCategory,
        updateUser,
        deleteCategory,
        deleteUser,
        checkEmail,
        getProductsByCategory
    }
}

export default usePlatziService;