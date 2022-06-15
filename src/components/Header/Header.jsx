import './Header.scss';
import header_logo from './../../assets/images/header-logo.png';

const Header = ({
    currentLanguage,
    onChangeLanguage,
    onChangeCity,
    searchCity
}) => {

    return (
        <header className="header">
            <div className="header__logo">
                <img src={header_logo} width='50px' alt="" />
                <span>Weather App</span>
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