import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import usePlatziService from '../../../services/PlatziService';

import ProductsList from '../../productsList/ProductsList';
import Spinner from '../../spinner/Spinner';

import { productAdded } from '../../../actions';

import thumbnail from '../../../resources/img/thumbnail.png';

import './singleProductPage.scss';

const SingleProductPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [count, setCount] = useState(0);
    const [categoryId, setCategoryId] = useState();
    const [buttonState, setButtonState] = useState({ text: 'To cart', color: '' });

    const {getProduct, getProductsByCategory} = usePlatziService();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        onRequest();
    }, [productId])

    const onRequest = () => {
        getProduct(productId)
            .then(onProductLoaded);
    }

    const onProductLoaded = (product) => {
        setProduct(product);
        setCategoryId(product.category.id)
        setLoading(false);
    }

    const changeSlide = useCallback((num) => {
        setCurrentSlide(num);
    }, [currentSlide])

    const changeCount = useCallback((operator) => {
        setCount(prevCount => operator === 'plus' ? prevCount + 1 : (prevCount > 0 ? prevCount - 1 : prevCount));
    }, [count])

    const onAddButton = useCallback((product, count) => {
        if (count > 0) {
            const { title, images, price, id } = product;
            const imageUrl = images[0] ? images[0].replace(/[\[\]"]/g, '') : thumbnail;
    
            const newProduct = {
                title,
                image: imageUrl,
                id,
                quantity: count,
                price: price,
                user: user
            };
    
            dispatch(productAdded(newProduct));
            setButtonState({ text: 'Added', color: '#33B241' });
            setCount(0);
            setTimeout(() => {
                setButtonState({ text: 'To cart', color: '' });
            }, 2000);
        }
    }, []);
    

    const content = !loading ? <View 
                                product={product} 
                                currentSlide={currentSlide} 
                                changeSlide={changeSlide}
                                count={count}
                                changeCount={changeCount}
                                categoryId={categoryId}
                                onAddButton={onAddButton}
                                buttonState={buttonState}
                                /> 
                                : <section className='section'><Spinner/></section>

    return (
        <>
            {content}
        </>
    )
}

const View = ({product, currentSlide, changeSlide, count, changeCount, categoryId, onAddButton, buttonState}) => {
    const {title, price, description, images} = product;
    const imageUrls = (images && images.length > 0) ? images.map(item => item.replace(/[\[\]"]/g, '')) : [thumbnail];

    const renderImages = (imageUrls) => {
        return imageUrls.slice(0,4).map((path, i) => <img key={i} onClick={() => changeSlide(i)} src={path} className='product__image-img' />)
    }

    return (
        <>
            <section className='section product'>
                <div className='wrapper'>
                    
                    <div className='product__offer'>
                        <div className='product__block'>
                            <div className='product__image'>
                                <img src={imageUrls[currentSlide]} className='product__image-main'/>
                                <div className='product__images'>
                                { renderImages(imageUrls) }
                                </div>
                            </div>
                        </div>
                        <div className='product__block'>
                            <div className='product__about'>
                                <div className='flex-offer jus-con-sb'>
                                    <h1 className='product__title'>
                                        {title}
                                    </h1>
                                    <span className='product__price'>
                                        {price} $
                                    </span> 
                                </div>
                                <p className='product__descr'>
                                    {description}
                                </p>
                                <div className='flex-offer gap-20 al-it-cen'>
                                    <p className='product__descr'>Quantity: </p>
                                    <div className='flex-offer gap-10 al-it-cen no-wrap'>
                                        <span onClick={() => changeCount('minus')} className='product__symbol'>-</span>
                                        <span className='product__number'>{count}</span>
                                        <span onClick={() => changeCount('plus')} className='product__symbol'>+</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onAddButton(product, count)} 
                                    className='button product__button' 
                                    style={{ backgroundColor: buttonState.color }}
                                >
                                    {buttonState.text}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section'>
                {<ProductsList categoryId={categoryId} limit={5} random={true}/>}
            </section>
        </>
    )
}


export default SingleProductPage;