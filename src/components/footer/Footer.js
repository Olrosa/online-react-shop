import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import usePlatziService from '../../services/PlatziService';

import Spinner from '../spinner/Spinner';

import qr from '../../resources/img/qr.svg';
import './footer.scss';

const Footer = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAllCategories } = usePlatziService();

    useEffect(() => {
        getAllCategories()
            .then(res => {
                setCategories(res);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            })
    }, [])

    const content = !loading ? <View categories={categories}/> : (<div className="section wrapper"><Spinner/></div>)

    return (
        <>
            {content}
        </>
    )
}

const View = ({categories}) => {

    return (
        <footer className="footer">
            <div className="wrapper">
                <div className="footer__offer">
                    <div className="footer__item">
                        <h3 className="footer__title">Categories</h3>
                        <ul className="footer__list">
                            {categories.slice(0,4).map(category => (
                                <li key={category.id}>
                                    <Link to={`/categories/${category.id}`} className="footer__link">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer__item">
                        <h3 className="footer__title">Blog</h3>
                        <ul className="footer__list">
                            <Link to="#" className="footer__link">
                                Article 1
                            </Link>
                            <Link to="#" className="footer__link">
                                Article 2
                            </Link>
                        </ul>
                    </div>
                    <div className="footer__item">
                        <h3 className="footer__title">Useful links</h3>
                        <ul className="footer__list">
                            <Link to="#" className="footer__link">
                                Peronal accout
                            </Link>
                            <Link to="#" className="footer__link">
                                Cart
                            </Link>
                        </ul>
                    </div>
                    <img src={qr} className='footer__qr'/>
                </div>
            </div>
        </footer>
    )
}

export default Footer;