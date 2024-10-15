
import ProductsList from "../productsList/ProductsList";

const MainPage = () => {
    return (
        <>
            <ProductsList categoryId={2} />
            <ProductsList categoryId={3} />
        </>
    )
}

export default MainPage;