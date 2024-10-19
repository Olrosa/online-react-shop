import ProductsList from '../../productsList/ProductsList';
import Banner from '../../banner/Banner';


const MainPage = () => {
    return (
        <>
            <div className='section flex-offer-col gap-50'>
                <Banner/>
                <ProductsList categoryId={1} />
                <ProductsList categoryId={2} />
            </div>
        </>
    )
}

export default MainPage;