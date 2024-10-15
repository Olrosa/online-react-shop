import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MainPage } from '../pages';

import Header from "../header/Header";

import './app.scss';

const App = () => {
    return (
        <Router>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
            </main>
        </Router>
    )
}

export default App;