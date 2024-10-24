import { login, getUserProfile } from '../services/PlatziServiceWithoutHook';

export const productAddedToCart = (product) => ({
    type: 'PRODUCT_ADDED_TO_CART',
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

export const setCart = (cart) => ({
    type: 'SET_CART',
    payload: cart
});

export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await login(email, password);
            if (res.access_token) {
                console.log('Успех')
                localStorage.setItem('token', res.access_token);
                const userProfile = await getUserProfile(res.access_token);
                console.log('User profile:', userProfile);
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
        const cart = JSON.parse(localStorage.getItem('cart'));
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
        if (cart && !token) {
            dispatch(setCart(cart))
        }
    };
};