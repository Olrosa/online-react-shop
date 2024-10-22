import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { quantityProductUpdated, cartItemRemoved } from '../../actions';

const CartItem = ({item}) => {
    const {title, price, image, quantity, id} = item;

    const dispatch = useDispatch();

    const [count, setCount] = useState(item.quantity);
    
    const totalPrice = price * quantity;

    const onUpdateQuantity = (operator) => {
        setCount(prevCount => operator === 'plus' ? prevCount + 1 : (prevCount > 1 ? prevCount - 1 : prevCount));
        dispatch(quantityProductUpdated(count, id));
    }

    const onRemoveItem = () => {
        dispatch(cartItemRemoved(id));
    }

    return (
        <div className='cart__item'>
            <Link  to={`/products/${id}`} className='flex-offer gap-20'>
                <img src={image} className='cart__img'/>
                <h3 className='cart__name'>
                    {title}
                </h3>
            </Link>
            <div className='flex-offer-col gap-10 al-it-end gap-20'>
                <span className='cart__price'>
                   {totalPrice} $
                </span>
                <div className='flex-offer gap-20 al-it-cen  '>
                    <p className='product__descr'>Quantity: </p>
                    <div className='flex-offer gap-10 al-it-cen no-wrap'>
                        <span onClick={() => onUpdateQuantity('minus')} className='product__symbol'>-</span>
                        <span className='product__number'>{count}</span>
                        <span onClick={() => onUpdateQuantity('plus')} className='product__symbol'>+</span>
                    </div>
                </div>
                <button onClick={onRemoveItem} className='button button-danger'>Remove</button>
            </div>
        </div>
    )
}

export default CartItem;