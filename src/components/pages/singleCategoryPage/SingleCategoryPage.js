import { useParams } from 'react-router-dom';

import ProductsList from '../../productsList/ProductsList';

import './singleCategoryPage.scss';

const SingleCategoryPage = () => {
    const {categoryId} = useParams();

    return (
        <>
            <div className='section flex-offer-col gap-50'>
                <ProductsList categoryId={categoryId} limit={10} />
            </div>
        </>
    )
}

export default SingleCategoryPage;