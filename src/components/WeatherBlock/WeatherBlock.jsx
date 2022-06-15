import { useState } from 'react';
import './WeatherBlock.scss';

const WeatherBlock = ({
    id,
    title,
    icon,
    weather,
    currentLanguage,
    darkMode
}) => {

    const [isFull, changeList] = useState(false);
    let wd;

    switch (new Date(weather[id].dt * 1000).getDay()) {
        case 1:
            currentLanguage === 'ru' ? wd = 'Пн' : wd = 'Mon';
            break;
        case 2:
            currentLanguage === 'ru' ? wd = 'Вт' : wd = 'Tue';
            break;
        case 3:
            currentLanguage === 'ru' ? wd = 'Ср' : wd = 'Wed';
            break;
        case 4:
            currentLanguage === 'ru' ? wd = 'Чт' : wd = 'Thu';
            break;
        case 5:
            currentLanguage === 'ru' ? wd = 'Пт' : wd = 'Fri';
            break;
        case 6:
            currentLanguage === 'ru' ? wd = 'Сб' : wd = 'Sat';
            break;
        case 0:
            currentLanguage === 'ru' ? wd = 'Вс' : wd = 'Sun';
            break;
        default:
            break;
    }

    return (
        <div className={!darkMode
            ? 'weatherBlock__block'
            : 'weatherBlock__block weatherBlock__block-dark'}>
            <div className='weatherBlock__date'>{wd}</div>
            <div className={!darkMode
                ? 'weatherBlock__title'
                : 'weatherBlock__title weatherBlock__title-dark'}>
                {title}
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
            </div>
            <div className={!darkMode
                ? "weatherBlock__content"
                : "weatherBlock__content weatherBlock__content-dark"}>
                <h2 className={!darkMode
                    ? 'weatherBlock__description'
                    : 'weatherBlock__description weatherBlock__description-dark'}>
                    {weather[id].weather[0].description}
                </h2>
                <ul className={!darkMode
                    ? 'weatherBlock__shortList'
                    : 'weatherBlock__shortList weatherBlock__shortList-dark'}>
                    <li>{currentLanguage === 'en'
                        ? 'Morning'
                        : 'Утро'}: <span>{weather[id].temp.morn}°</span>
                    </li>
                    <li>{currentLanguage === 'en'
                        ? 'Day'
                        : 'День'}: <span>{weather[id].temp.day}°</span>
                    </li>
                    <li>{currentLanguage === 'en'
                        ? 'Evening'
                        : 'Вечер'}: <span>{weather[id].temp.eve}°</span>
                    </li>
                    <li>{currentLanguage === 'en'
                        ? 'Night'
                        : 'Ночь'}: <span>{weather[id].temp.night}°</span>
                    </li>
                </ul>
                {!isFull
                    ? null
                    : <ul className={!darkMode
                        ? 'weatherBlock__fullList'
                        : 'weatherBlock__fullList weatherBlock__shortList-dark'}>
                        <li>{currentLanguage === 'en'
                            ? 'Max'
                            : 'Максимум'}: <span>{weather[id].temp.max}°</span>
                        </li>
                        <li>{currentLanguage === 'en'
                            ? 'Min'
                            : 'Минимум'}: <span>{weather[id].temp.min}°</span>
                        </li>
                        <li>{currentLanguage === 'en'
                            ? 'Humidity'
                            : 'Влажность'}: <span>{weather[id].humidity}%</span>
                        </li>
                        <li>{currentLanguage === 'en'
                            ? 'Pressure'
                            : 'Давление'}: <span>{weather[id].pressure} {currentLanguage === 'en'
                                ? 'hPa'
                                : 'гПа'}</span>
                        </li>
                    </ul>
                }

            </div>
            {!isFull
                ? <button className='weatherBlock__btn' onClick={() => changeList(true)}>
                    {currentLanguage === 'en'
                        ? 'show more'
                        : 'показать еще'}</button>
                : <button className='weatherBlock__btn' onClick={() => changeList(false)}>
                    {currentLanguage === 'en'
                        ? 'close'
                        : 'закрыть'}</button>}
        </div>
    )
}

export default WeatherBlock;