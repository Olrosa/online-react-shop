import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { initializeSession } from "../../actions";

import ProtectedRoute from "../protectedRoute/ProtectedRoute";

import { MainPage, SingleProductPage, SingleCategoryPage, CartPage, LoginPage, AdminPage, ProfilePage, SignUpPage } from "../pages";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./app.scss";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeSession());
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <main>
                <AnimatedRoutes />
            </main>
            <Footer />
        </Router>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();

    // Быстрая и динамичная анимация
    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.95, // Немного сжата
            y: 50, // Смещена вниз
        },
        animate: {
            opacity: 1,
            scale: 1, // Возвращается к нормальному размеру
            y: 0, // Позиция по центру
        },
        exit: {
            opacity: 0,
            scale: 0.95, // Уменьшается
            y: -50, // Уходит вверх
        },
    };

    const pageTransition = {
        duration: 0.3, // Очень быстрое переключение
        ease: "easeOut", // Резкий выход
    };

    // Список маршрутов
    const routesConfig = [
        { path: "/", element: <MainPage /> },
        { path: "/products/:productId", element: <SingleProductPage /> },
        { path: "/categories/:categoryId", element: <SingleCategoryPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/cart", element: <CartPage /> },
        {
            path: "/admin",
            element: (
                <ProtectedRoute roles={["admin"]}>
                    <AdminPage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute roles={["customer", "admin"]}>
                    <ProfilePage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/signup",
            element: (
                <ProtectedRoute roles={["user"]}>
                    <SignUpPage />
                </ProtectedRoute>
            ),
        },
    ];

    // Рендер маршрутов с анимацией
    const renderAnimatedRoute = (path, element) => (
        <Route
            key={path}
            path={path}
            element={
                <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                    style={{
                        minHeight: "100vh", // Обеспечиваем, что страница занимает всю высоту экрана
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {element}
                </motion.div>
            }
        />
    );

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {routesConfig.map(({ path, element }) =>
                    renderAnimatedRoute(path, element)
                )}
            </Routes>
        </AnimatePresence>
    );
};

export default App;
