import './Main.scss';
import * as axios from "axios";
import { useEffect, useState } from "react";
import homeIcon from './../../assets/images/home.png';
import temp from './../../assets/images/temp.png';
import temp_max from './../../assets/images/temp_max.png';
import temp_min from './../../assets/images/temp_min.png';
import temp_feels_like from './../../assets/images/temp_feels_like.png';
import humidity from './../../assets/images/humidity.png';
import visibility from './../../assets/images/visibility.png';
import weatherIcon from './../../assets/images/weather.png';
import WeatherBlock from '../WeatherBlock/WeatherBlock';
import Header from './../Header/Header';

const Main = ({
    darkMode,
    changeMode
}) => {

    const [weather, setWeather] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');


    const api = 'd779f17843098d3158c1d2a9115ce239';
    let currentCity = 'Moscow';
    let weatherForecast = [];
    let currentDate;

    const searchCity = () => {
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&appid=${api}`).then(city => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`).then(response => {
                setCurrentWeather(response)
            })
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`).then(response => {
                for (let i = 0; i < 7; i++) {
                    weatherForecast[i] = response.data.daily[i]
                }
                setWeather(weatherForecast)
            })
        })
    }

    useEffect(() => {
        searchCity()
    }, [currentLanguage])

    if (!weather) {
        return <div>loading...</div>
    }

    if (weather) {
        if (currentLanguage === 'ru') {
            for (let i = 0; i < 7; i++) {
                switch (weather[i].weather[0].main) {
                    case 'Clouds':
                        weather[i].weather[0].main = 'Облака';
                        break;
                    case 'Clear':
                        weather[i].weather[0].main = 'Ясно';
                        break;
                    case 'Snow':
                        weather[i].weather[0].main = 'Снег';
                        break;
                    case 'Rain':
                        weather[i].weather[0].main = 'Дождь';
                        break;
                    case 'Drizzle':
                        weather[i].weather[0].main = 'Изморось';
                        break;
                    case 'Thunderstorm':
                        weather[i].weather[0].main = 'Гроза';
                        break;
                    default:
                        break;
                }
            }
        }

        switch (new Date(weather[0].dt * 1000).getDay()) {
            case 1:
                currentLanguage === 'en' ? currentDate = 'Monday' : currentDate = 'Понедельник';
                break;
            case 2:
                currentLanguage === 'en' ? currentDate = 'Tuesday' : currentDate = 'Вторник';
                break;
            case 3:
                currentLanguage === 'en' ? currentDate = 'Wednesday' : currentDate = 'Среда';
                break;
            case 4:
                currentLanguage === 'en' ? currentDate = 'Thursday' : currentDate = 'Четверг';
                break;
            case 5:
                currentLanguage === 'en' ? currentDate = 'Friday' : currentDate = 'Пятница';
                break;
            case 6:
                currentLanguage === 'en' ? currentDate = 'Saturday' : currentDate = 'Суббота';
                break;
            case 0:
                currentLanguage === 'en' ? currentDate = 'Sunday' : currentDate = 'Воскресенье';
                break;
            default:
                break;
        }
    }

    const onChangeCity = (e) => {
        currentCity = e.currentTarget.value;
    }

    const onChangeLanguage = (e) => {
        setCurrentLanguage(e.currentTarget.value);

    }

    return (
        <div className="content">
            <Header currentLanguage={currentLanguage}
                onChangeCity={onChangeCity}
                searchCity={searchCity}
                onChangeLanguage={onChangeLanguage}
                changeMode={changeMode}
                darkMode={darkMode} />

            <div className="content__row content__current">
                {/* {console.log(weather)}
                {console.log(currentWeather)} */}
                <div className={!darkMode
                    ? "content__col content__col-medium"
                    : "content__col content__col-medium content__col-dark"}>
                    <div className={!darkMode
                        ? 'content__currentDate'
                        : 'content__currentDate content__dark-mode-text'}>
                        {currentDate}
                    </div>
                    <div className='content__row-default'>
                        <div className="content__col-default">
                            <h1 className={!darkMode
                                ? 'content__main-title'
                                : 'content__main-title content__dark-mode-text'}>
                                {weather[0].weather[0].main}
                            </h1>
                            <div className={!darkMode
                                ? 'content__currentWeather'
                                : 'content__currentWeather content__currentWeather-dark'}>
                                {currentWeather.data.main.temp}°
                            </div>

                        </div>
                        <div className="content__col-default">
                            <img src={`http://openweathermap.org/img/wn/${currentWeather.data.weather[0].icon}@2x.png`} alt="" />
                        </div>
                    </div>
                    <div className={!darkMode
                        ? 'content__currentCity'
                        : 'content__currentCity content__dark-mode-text'}>
                        {currentWeather.data.name}, {currentWeather.data.sys.country}
                    </div>
                </div>
                <div className={!darkMode
                    ? "content__col content__col-big"
                    : 'content__col content__col-big content__col-dark'}>
                    <h2 className={!darkMode
                        ? 'content__description'
                        : 'content__description content__dark-mode-text'}>
                        {currentWeather.data.weather[0].description}
                    </h2>
                    <ul className={!darkMode
                        ? null
                        : 'content__dark-mode-text'}>
                        <li>
                            <img src={temp_feels_like} width='16' alt="" />
                            <div>{currentLanguage === 'en'
                                ? 'Feels like'
                                : 'Ощущается как'}: <span>{currentWeather.data.main.feels_like}°</span>
                            </div>
                        </li>
                        <li>
                            <img src={humidity} width='16' alt="" />
                            <div>{currentLanguage === 'en'
                                ? 'Humidity'
                                : 'Влажность'}: <span>{currentWeather.data.main.humidity}%</span>
                            </div>
                        </li>
                        <li>
                            <img src={temp_feels_like} width='16' alt="" />
                            <div>{currentLanguage === 'en'
                                ? 'Preassure'
                                : 'Давление'}: <span>{currentWeather.data.main.pressure} {currentLanguage === 'en'
                                    ? 'hPa'
                                    : 'гПа'}</span>
                            </div>
                        </li>
                        <li>
                            <img src={visibility} width='16' alt="" />
                            <div>{currentLanguage === 'en'
                                ? 'Visibility'
                                : 'Видимость'}: <span>{currentWeather.data.visibility} {currentLanguage === 'en'
                                    ? 'm'
                                    : 'м'}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="content__row content__forecast">
                {weather.map((item, index) => {
                    return <WeatherBlock
                        key={index}
                        id={index}
                        title={item.weather[0].main}
                        icon={item.weather[0].icon}
                        weather={weather}
                        currentLanguage={currentLanguage}
                        darkMode={darkMode} />
                })}
            </div>
        </div>
    )
}

export default Main