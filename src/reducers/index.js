const initialState = {
    cart: [],
    user: null,
    role: 'user',
    authorization: false,
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_APP':
            if (action.payload === false) {
                return {
                    ...state,
                    token: null,
                    authorization: false,
                    user: null,
                    role: 'user'
                };
            }
            return {
                ...state,
                token: action.payload.token || null, 
                authorization: !!action.payload.token, 
                user: action.payload,
                role: action.payload.role || 'user'
            };

        case 'PRODUCT_ADDED':
            const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);

            if (existingProductIndex !== -1) {
                // Обновляем количество для существующего товара
                const updatedCart = [...state.cart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + action.payload.quantity, // Обновляем quantity
                    totalPrice: updatedCart[existingProductIndex].totalPrice + action.payload.totalPrice // Обновляем totalPrice
                };
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                // Добавляем новый товар с полем quantity
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        action.payload,
                    ]
                };
            }
        case 'QUANTITY_PRODUCT_UPDATED':
            const productIndex = state.cart.findIndex(
                item => item.id === action.payload.id
            );

            if (productIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
                    quantity: action.payload.count // Обновляем quantity
                };
                return {
                    ...state,
                    cart: updatedCart
                };
            }
            return state
        case 'CART_ITEM_REMOVED':
            const filteredCart = state.cart.filter(item => item.id !== action.payload);
            return {
                ...state,
                cart: filteredCart
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authorization: true,
                role: action.payload.role
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                authorization: false,
                role: 'user'
            };
        default:
            return state;
    }
};


export default reducer;