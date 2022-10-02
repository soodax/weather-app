import './Main.scss';
import * as axios from "axios";
import { useEffect, useState } from "react";
import temp from './../../assets/images/temp.png';
import temp_feels_like from './../../assets/images/temp_feels_like.png';
import humidity from './../../assets/images/humidity.png';
import visibility from './../../assets/images/visibility.png';
import WeatherBlock from '../WeatherBlock/WeatherBlock';
import Header from './../Header/Header';
import Preloader from '../../assets/images/preloader.gif';

const Main = ({
    darkMode,
    changeMode
}) => {

    const [weather, setWeather] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentCity, setCurrentCity] = useState('');

    const api = 'd779f17843098d3158c1d2a9115ce239';
    let currentDate;

    const getData = async (geolocation) => {
        let city = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${geolocation}&appid=${api}`)
        
        let resCurrentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`)
        setCurrentWeather(resCurrentWeather)
        
        let resWeatherForecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`)
        let weatherForecast = [];
        for (let i = 0; i < 7; i++) {
            weatherForecast[i] = resWeatherForecast.data.daily[i]
        }
        setWeather(weatherForecast)
    }

    const searchCity = async () => {       
        if (!currentCity) {          
            if (navigator.geolocation) {              
                navigator.geolocation.getCurrentPosition(async (position) => {                   
                    let location = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api}`)
                    setCurrentCity(location.data[0].name)    
                    getData(location.data[0].name)
                    console.log(location.data[0].name)
                    console.log('geo base city')
                },
                function(error) {
                    if(error.PERMISSION_DENIED || error.POSITION_UNAVAILABLE || error.TIMEOUT) {
                        // alert("В доступе отказано!");
                        setCurrentCity('Moscow');
                        getData('Moscow');
                        console.log('default base city rejected')
                    }
        }); 
            } else {                
                // alert("Geolocation is not supported by this browser.");
                setCurrentCity('Moscow');
                getData('Moscow');
                console.log('default base city')
            }
        } else {
            getData(currentCity);
            console.log('state city')
        } 
    }

    useEffect(() => {
        searchCity();
    }, [currentLanguage])

    if (!weather) {
        return <div className='preloader'><img  src={Preloader} alt="loading..." /></div>
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
        setCurrentCity(e.currentTarget.value)      
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
                                {Math.round(currentWeather.data.main.temp)}°
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