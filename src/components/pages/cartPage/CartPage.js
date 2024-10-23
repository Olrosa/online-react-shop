import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../../cartItem/CartItem';


import './cartPage.scss';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);


    const renderItems = (arr) => {
        return arr.map((item, i) => {
            return <CartItem key={i} item={item}/>
        })
    }

    const checkCost = () => {
        return cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }

    const checkState = () => {
        console.log(cart);
    }

    const content = (cart.length > 0)  ? renderItems(cart) : <p className='cart__empty'>Cart is empty :(</p>

    const finishOrder =  (cart.length > 0) ? (
        <div className='flex-offer gap-20 al-it-cen jus-con-end'>
            <span className='cart__cost'>Cost: {checkCost()}</span>
                <button className='button button-order'>
                Order
            </button>
        </div>
    ) : null;

    return (
        <>
            <div className='section cart'>
                <div className='wrapper'>
                    <h1>
                        Cart
                    </h1>    
                    <button onClick={checkState} className='button button-order'>
                        Check state
                    </button>
                    <div className='cart__offer'>
                        {content}
                        {finishOrder}
                    </div>
                </div>
            </div> 
        </>
    )
}

export default CartPage;