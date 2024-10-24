import { login, getUserProfile } from '../services/PlatziService';

export const productAdded = (product) => ({
    type: 'PRODUCT_ADDED',
    payload: product
});

export const quantityProductUpdated = (count, id) => ({
    type: 'QUANTITY_PRODUCT_UPDATED',
    payload: {
        count,
        id
    }
});

export const cartItemRemoved = (id) => ({
    type: 'CART_ITEM_REMOVED',
    payload: id
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const initApp = (userData) => ({
    type: 'INIT_APP',
    payload: userData
});


export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await login(email, password);
            if (res.access_token) {
                localStorage.setItem('token', res.access_token);
                const userProfile = await getUserProfile(res.access_token);
                dispatch(initApp({ ...userProfile, token: res.access_token }));
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
        }
    };
};

export const initializeSession = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await getUserProfile(token);
                if (res) {
                    dispatch(initApp({ ...res, token }));
                } else {
                    dispatch(initApp(false));
                }
            } catch (err) {
                console.error(err);
                dispatch(initApp(false));
            }
        } else {
            dispatch(initApp(false));
        }
    };
};