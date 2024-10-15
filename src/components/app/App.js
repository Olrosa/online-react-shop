import Header from '../header/Header';
import ProductsList from '../productsList/ProductsList';

import './app.scss';

const App = () => {
    return (
        <>
            <Header/>
            <main>
                <div className='wrapper'>
                    <ProductsList></ProductsList>
                </div>
            </main>
        </>
    )
}

export default App;