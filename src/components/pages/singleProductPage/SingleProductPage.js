import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import usePlatziService from '../../../services/PlatziService';

import Spinner from '../../spinner/Spinner'

import thumbnail from '../../../resources/img/thumbnail.png';

import './singleProductPage.scss';

const SingleProductPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [count, setCount] = useState(0);

    const {getProduct} = usePlatziService();

    useEffect(() => {
        updateProduct();
    }, [productId])

    const updateProduct = () => {
        getProduct(productId)
            .then(onProductLoaded)
    }

    const onProductLoaded = (product) => {
        setProduct(product);
        setLoading(false);
    }

    const changeSlide = useCallback((num) => {
        setCurrentSlide(num);
    }, [currentSlide])

    const changeCount = useCallback((operator) => {
        setCount(prevCount => operator === 'plus' ? prevCount + 1 : (prevCount > 0 ? prevCount - 1 : prevCount));
    }, [count])
    

    const content = !loading ? <View 
                                product={product} 
                                currentSlide={currentSlide} 
                                changeSlide={changeSlide}
                                count={count}
                                changeCount={changeCount}/> 
                                : <section className='section'><Spinner/></section>

    return (
        <>
            {content}
        </>
    )
}

const View = ({product, currentSlide, changeSlide, count, changeCount}) => {
    const {title, price, description, images} = product;
    const imageUrls = (images && images.length > 0) ? images.map(item => item.replace(/[\[\]"]/g, '')) : [thumbnail];

    const renderImages = (imageUrls) => {
        return imageUrls.slice(0,4).map((path, i) => <img key={i} onClick={() => changeSlide(i)} src={path} className='product__image-img' />)
    }

    return (
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
                            <button className='button product__button'>
                                To cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default SingleProductPage;