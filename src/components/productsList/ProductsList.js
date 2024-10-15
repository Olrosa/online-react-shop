import { useEffect, useState } from 'react';
import ProductsListItem from '../ProductsListItem/ProductsListItem';

import usePlatziService from '../../services/PlatziService';

import './ProductsList.scss';

const ProductsList = () => {

    const {getProductsByCategory, getCategory} = usePlatziService();
    
    const [categoryName, setCategoryName] = useState('');
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 5;

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {  
        Promise.all([getProductsByCategory(2, limit, offset), getCategory(2)])
            .then(([products, category]) => {
                setProductsList(products);
                setCategoryName(category.name);
                setLoading(false);
            });
    }

    const loadMoreProducts = () => {
        setLoading(true);
        getProductsByCategory(2, limit, offset + limit)
            .then(newProducts => {
                setProductsList(prevProducts => [...prevProducts, ...newProducts]);
                setOffset(prevOffset => prevOffset + limit);
                setLoading(false);
            });
    };

    function renderItems(arr) {
        const items =  arr.map(item => {
            return (
                <>
                    <ProductsListItem {...item} key={item.id}/>
                </>
            )
        });
        
        return (
            <div className="products__offer">
                {items}
            </div>
        )
    }

    const items = renderItems(productsList);

    return (
        <div className="products"> 
            <h2 className="products__title">{categoryName}</h2>
            {items}
            <button className="button button-more" onClick={loadMoreProducts} disabled={loading}>
                {loading ? 'Loading...' : 'Load more'}
            </button>
        </div>
    )
} 

export default ProductsList;