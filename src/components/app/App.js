import Header from '../header/Header';
import ProductsList from '../productsList/ProductsList';

import './app.scss';

const App = () => {
    return (
        <>
            <Header/>
            <main>
                <div className='wrapper'>
                    <ProductsList categoryId={2} />
                    <ProductsList categoryId={3} />
                </div>
            </main>
        </>
    )
}

export default App;