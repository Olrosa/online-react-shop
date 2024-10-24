import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {initApp} from '../../actions'

import usePlatziService from "../../services/PlatziService";

import { MainPage, SingleProductPage, SingleCategoryPage, CartPage, LoginPage } from '../pages';

import Header from "../header/Header";
import Footer from "../footer/Footer";

import './app.scss';

const App = () => {
    const {getUserProfile} = usePlatziService(); 

    const dispatch = useDispatch();
    const user = {};

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            getUserProfile(token)
                .then(res => {
                    if (res) { // Если ответ успешный
                        // Устанавливаем данные пользователя и токен в Redux
                        dispatch(initApp({ ...res, token })); // Теперь передаем и токен, и данные пользователя
                    } else {
                        dispatch(initApp(false)); // Токен недействителен
                    }
                })
                .catch(err => {
                    console.error(err); // Логируем ошибку для отладки
                    dispatch(initApp(false)); // Ошибка при проверке токена
                });
        } else {
            dispatch(initApp(false)); // Токен отсутствует
        }
    }, [dispatch, getUserProfile]);
    

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