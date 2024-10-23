import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { productAdded } from '../../actions';

import './ProductsListItem.scss';
import thumbnail from '../../resources/img/thumbnail.png';

const ProductsListItem = (props) => {
    const [buttonState, setButtonState] = useState({ text: 'To cart', color: '' });
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    let {title, price, images, id} = props;

    price = price || 0;
    title = title || 'Name of product';
    images = (images && images.length > 0) ? images[0].replace(/[\[\]"]/g, '') : thumbnail;

    const onAddButton = () => {
        const newProduct = {
            title,
            image: images,
            id,
            quantity: 1, 
            price: price,
            user: user
        };

        dispatch(productAdded(newProduct));
        setButtonState({ text: 'Added', color: '#33B241' });
        setTimeout(() => {
            setButtonState({ text: 'To cart', color: '' });
        }, 2000);
        
    };

    return (
        <div className='card flex-offer-col gap-20'>
            <Link to={`/products/${id}`} className='flex-offer-col gap-20'>
                <div className='card__img' style={{backgroundImage: `url('${images}')`}} >
                    <svg className="card__like" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64157 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77739 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987Z" fill="white" stroke="#44474C" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"></path></svg>  
                </div>
                <div className='flex-offer-col gap-10'>
                    <p className='card__price'>
                        {price} $
                    </p>
                    <span className='card__title'>{title}</span>
                </div>
            </Link>
            <button 
                onClick={onAddButton} 
                className='button' 
                style={{ backgroundColor: buttonState.color }}
            >
                {buttonState.text}
            </button>
        </div>
    )
} 

export default ProductsListItem;