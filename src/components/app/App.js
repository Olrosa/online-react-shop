import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store/index';

import { MainPage, SingleProductPage, SingleCategoryPage, CartPage, LoginPage } from '../pages';

import Header from "../header/Header";
import Footer from "../footer/Footer";

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
                        <Route path="/categories/:categoryId" element={<SingleCategoryPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/cart" element={<CartPage/>}/>
                    </Routes>
                </main>
                <Footer/>
            </Router>
        </Provider>
    )
}

export default App;