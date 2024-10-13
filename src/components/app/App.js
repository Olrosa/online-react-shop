import { useEffect } from 'react';

import usePlatziService from '../../services/PlatziService';

import './app.scss';

const App = () => {

    const {getAllProducts} = usePlatziService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        getAllProducts()
            .then(res => console.log(res))
    }

    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default App;