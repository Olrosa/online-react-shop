
import ProductsList from "../productsList/ProductsList";

const MainPage = () => {
    return (
        <>
            <ProductsList categoryId={1} />
            <ProductsList categoryId={2} />
        </>
    )
}

export default MainPage;