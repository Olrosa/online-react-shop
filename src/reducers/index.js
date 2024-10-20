const initialState = {
    cart: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                        action.payload
                    ]
                };
            }
        default:
            return state;
    }
};


export default reducer;