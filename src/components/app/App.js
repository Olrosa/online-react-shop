import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {initializeSession } from '../../actions'

import ProtectedRoute from "../protectedRoute/ProtectedRoute";

import usePlatziService from "../../services/PlatziService";
import useFirebaseService from "../../services/FirebaseService";

import { MainPage, SingleProductPage, SingleCategoryPage, CartPage, LoginPage, AdminPage, ProfilePage, SignUpPage } from '../pages';

import Header from "../header/Header";
import Footer from "../footer/Footer";

import './app.scss';

const App = () => {
    const {getAllUsers} = usePlatziService();
    const {saveAllUsersFromPlatziToDB} = useFirebaseService();

    const dispatch = useDispatch();
    const user = {};

    useEffect(() => {
        dispatch(initializeSession());
    }, [dispatch]);
    
    useEffect(() => {
        saveAllUsersFromPlatziToDB();
    }, [getAllUsers, saveAllUsersFromPlatziToDB])

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

                    {/* PROTECTED */}

                    <Route path="/admin" element={
                        <ProtectedRoute roles={['admin']}>
                            <AdminPage/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/profile" element={
                        <ProtectedRoute roles={['customer', 'admin']}>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/signup" element={
                        <ProtectedRoute roles={['user']}>
                            <SignUpPage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </main>
            <Footer/>
        </Router>
    )
}

export default App;