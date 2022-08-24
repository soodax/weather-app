import './Header.scss';
import header_logo from './../../assets/images/header-logo.png';

const Header = ({
    currentLanguage,
    onChangeLanguage,
    onChangeCity,
    searchCity,
    changeMode,
    darkMode
}) => {

    return (
        <header className={!darkMode ? "header header__background-white" : "header header__background-dark"}>
            <div className={!darkMode ? "header__logo" : "header__logo header__logo-dark"}>
                <img src={header_logo} width='50px' alt="" />
                <span>Weather App</span>
                <div className="header__nightMode">
                    <span>
                        <input type="checkbox" onChange={!darkMode
                            ? () => changeMode(true)
                            : () => changeMode(false)} />
                    </span>
                </div>
            </div>
            <div className='header__search-block'>
                <div className='header__language'>
                    <select onChange={onChangeLanguage}>
                        <option value="en">en</option>
                        <option value="ru">ru</option>
                    </select>
                </div>
                <input className='header__search' placeholder={currentLanguage === 'en'
                    ? 'City name'
                    : 'Название города'} type="search" onChange={onChangeCity} />
                <button className='header__search-btn' onClick={searchCity}>
                    {currentLanguage === 'en'
                        ? 'Search'
                        : 'Поиск'}
                </button>
            </div>
        </header>
    )
}

export default Header;