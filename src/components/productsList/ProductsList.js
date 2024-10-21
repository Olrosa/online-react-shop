import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductsListItem from '../ProductsListItem/ProductsListItem';
import SkeletonLoader from '../skeletonLoader/SkeletonLoaderProducts';

import usePlatziService from '../../services/PlatziService';

import './ProductsList.scss';

const ProductsList = ({ categoryId, limit, random = false }) => {
    const { getProductsByCategory, getCategory, getProduct } = usePlatziService();
    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        onRequest(false, limit + 1); // Запрашиваем на один элемент больше
        
    }, []);

    const onRequest = async (isLoadMore = false, currentLimit = limit) => {
        setLoading(true);

        try {
            const products = await getProductsByCategory(categoryId, currentLimit, offset);
            if (isLoadMore) {
                setProductsList((prevProducts) => [...prevProducts, ...products.slice(0, limit)]);
            } else {
                setProductsList(products.slice(0, limit));
            }
    
            setHasMore(products.length > limit);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
            setOffset((prevOffset) => prevOffset + limit);
        }
    
        try {
            const category = await getCategory(categoryId);
            setCategoryName(category.name);
        } catch (error) {
            console.error(`Category with ID ${categoryId} not found:`, error);
        }
    };

    const loadMoreProducts = () => {
        if (!hasMore) return;
        onRequest(true);
    };

    function renderItems(arr, random) {
        const itemsArray = random ? [...arr].sort(() => Math.random() - 0.5) : arr;
        const items = itemsArray.map((item) => {
            return <ProductsListItem {...item} key={item.id} />;
        });
    
        return <div className="products__offer">{items}</div>;
    }

    const items = renderItems(productsList);

    return (
        <section className="products">
            <div className='wrapper'>
                <h2 className="products__title">{categoryName}</h2>
                {loading && productsList.length === 0 ? (
                    <SkeletonLoader />
                ) : (
                    items
                )}
                {loading && productsList.length > 0 ? (
                    <SkeletonLoader />
                ) : (
                    !loading &&
                    hasMore && (
                        <button
                            className="button button-more"
                            onClick={loadMoreProducts}
                            disabled={loading}
                        >
                            Load more
                        </button>
                    )
                )}
            </div>
        </section>
    );
};


export default ProductsList;