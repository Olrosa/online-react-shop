import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header__menu">
                <div className="header__menu-offer">
                    <img src="#" alt=" " className="header__logo"/>
                </div>
                <div className="header__menu-offer">
                    <form action="" method="get" className="header__search">
                        <input name="searchbar_inputField" type="search" className="header__search-input"/>
                        <button type="submit" className="header__search-btn">Найти</button>
                    </form>
                </div>
                <div className="header__menu-offer">
                    <div className="header__icon">
                        <div className="header__icon">
                            <img src="#" alt=" " className="header__icon-img"/>
                            <p className="header__icon-label">Адреса</p>
                        </div>
                        <div className="header__icon">
                            <img src="/src/img/user.png" alt=" " className="header__icon-img"/>
                            <p className="header__icon-label">Войти</p>
                        </div>
                        <div className="header__icon">
                            <img src="/src/img/shopping-cart.png" alt=" " className="header__icon-img"/>
                            <p className="header__icon-label">Корзина</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;