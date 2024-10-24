import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {initializeSession } from '../../actions'

import usePlatziService from "../../services/PlatziService";

import { MainPage, SingleProductPage, SingleCategoryPage, CartPage, LoginPage } from '../pages';

import Header from "../header/Header";
import Footer from "../footer/Footer";

import './app.scss';

const App = () => {
    const {getUser, login} = usePlatziService(); 

    const dispatch = useDispatch();
    const user = {};

    useEffect(() => {
        dispatch(initializeSession());
    }, [dispatch]);
    

    return (
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
    )
}

export default App;