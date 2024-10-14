import { useEffect } from 'react';
import usePlatziService from '../../services/PlatziService';

import ProductsList from '../productsList/ProductsList';

import './app.scss';

const App = () => {

    const {filterProducts} = usePlatziService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {  
    
    }

    return (
        <>
            <div className='wrapper'>
                <ProductsList></ProductsList>
            </div>
        </>
    )
}

export default App;