import ProductsList from '../../productsList/ProductsList';
import Banner from '../../banner/Banner';


const MainPage = () => {
    return (
        <>
            <div className='section flex-offer-col gap-50'>
                <Banner slideNum={0} autoplaySlider={true}/>
                <ProductsList categoryId={1} limit={5} />
                <ProductsList categoryId={2} limit={10}/>
            </div>
        </>
    )
}

export default MainPage;