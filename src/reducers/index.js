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
            console.log('INIT_APP action received:', action.payload);
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
                role: action.payload.role || 'user',
                cart: []
            };
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload
            }
        case 'PRODUCT_ADDED_TO_CART':
            const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
        
            let updatedCart;
            if (existingProductIndex !== -1) {
                // Обновляем количество для существующего товара
                updatedCart = [...state.cart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + action.payload.quantity, // Обновляем quantity
                    totalPrice: updatedCart[existingProductIndex].totalPrice + action.payload.totalPrice // Обновляем totalPrice
                };
            } else {
                // Добавляем новый товар с полем quantity
                updatedCart = [
                    ...state.cart,
                    action.payload,
                ];
            }
        
            // Сохраняем обновленную корзину в localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        
            return {
                ...state,
                cart: updatedCart
            };
            
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