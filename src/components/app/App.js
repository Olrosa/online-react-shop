import { useEffect } from 'react';

import usePlatziService from '../../services/PlatziService';

import './app.scss';

const App = () => {

    const {getProductsByCategory} = usePlatziService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {  
        getProductsByCategory(2)
            .then(res => console.log(res))
    }

    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default App;