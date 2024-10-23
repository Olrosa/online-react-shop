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

export const loginSuccess = (user, token, role) => ({
    type: 'LOGIN_SUCCESS',
    payload: { user, token, role }
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const initApp = (userData) => ({
    type: 'INIT_APP',
    payload: userData
})

