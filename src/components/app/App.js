import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store/index';

import { MainPage, SingleProductPage } from '../pages';

import Header from "../header/Header";

import './app.scss';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/products/:productId" element={<SingleProductPage/>}/>
                    </Routes>
                </main>
            </Router>
        </Provider>
    )
}

export default App;