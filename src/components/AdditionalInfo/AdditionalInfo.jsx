import './AdditionalInfo.scss';
import temp from './../../assets/images/temp.png';
import temp_feels_like from './../../assets/images/temp_feels_like.png';
import humidity from './../../assets/images/humidity.png';
import visibility from './../../assets/images/visibility.png';

const AdditionalInfo = ({
    darkMode,
    currentLanguage,
    currentWeather
}) => {
    return (
        <div className={!darkMode
            ? "content__col content__col-small"
            : 'content__col content__col-small content__col-dark'}>
            <h2 className={!darkMode
                ? 'content__description'
                : 'content__description content__dark-mode-text'}>
                {currentWeather.data.weather[0].description}
            </h2>
            <ul className={!darkMode
                ? null
                : 'content__dark-mode-text'}>
                <li>
                    <img className='content__icon' src={temp} alt="" />
                    <div>{currentLanguage === 'en'
                        ? 'Feels like'
                        : 'Ощущается как'}: <span>{Math.round(currentWeather.data.main.feels_like)}°</span>
                    </div>
                </li>
                <li>
                    <img className='content__icon' src={humidity} alt="" />
                    <div>{currentLanguage === 'en'
                        ? 'Humidity'
                        : 'Влажность'}: <span>{currentWeather.data.main.humidity}%</span>
                    </div>
                </li>
                <li>
                    <img className='content__icon' src={temp_feels_like} alt="" />
                    <div>{currentLanguage === 'en'
                        ? 'Preassure'
                        : 'Давление'}: <span>{currentWeather.data.main.pressure} {currentLanguage === 'en'
                            ? 'hPa'
                            : 'гПа'}</span>
                    </div>
                </li>
                <li>
                    <img className='content__icon' src={visibility} alt="" />
                    <div>{currentLanguage === 'en'
                        ? 'Visibility'
                        : 'Видимость'}: <span>{currentWeather.data.visibility} {currentLanguage === 'en'
                            ? 'm'
                            : 'м'}</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default AdditionalInfo;