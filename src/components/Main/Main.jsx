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
import header_logo from './../../assets/images/header-logo.png';

const Main = (props) => {

    const [weather, setWeather] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');

    let currentCity = 'Moscow';
    // let currentLanguage = 'eng';
    const api = 'd779f17843098d3158c1d2a9115ce239';
    let arr = [];
    let currentDate;


    const searchCity = () => {

        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&appid=${api}`).then(city => {

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`).then(response => {
                setCurrentWeather(response)
            })
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`).then(response => {
                for (let i = 0; i < 7; i++) {
                    arr[i] = response.data.daily[i]
                }
                setWeather(arr)

            })
        })

    }

    useEffect(() => {
        searchCity(currentCity)
    }, [currentLanguage])

    if (!weather) {
        return <div>loading...</div>
    }

    if (weather) {
        if (currentLanguage == 'ru') {
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
                }
            }
        }
        switch (new Date(weather[0].dt * 1000).getDay()) {
            case 1:
                if (currentLanguage == 'en') {
                    currentDate = 'Monday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Понедельник';
                }

                break;
            case 2:

                if (currentLanguage == 'en') {
                    currentDate = 'Tuesday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Вторник';
                }
                break;
            case 3:
                if (currentLanguage == 'en') {
                    currentDate = 'Wednesday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Среда';
                }

                break;
            case 4:
                if (currentLanguage == 'en') {
                    currentDate = 'Thursday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Четверг';
                }

                break;
            case 5:
                if (currentLanguage == 'en') {
                    currentDate = 'Friday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Пятница';
                }

                break;
            case 6:
                if (currentLanguage == 'en') {
                    currentDate = 'Saturday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Суббота';
                }

                break;
            case 0:
                if (currentLanguage == 'en') {
                    currentDate = 'Sunday';
                } else if (currentLanguage == 'ru') {
                    currentDate = 'Воскресенье';
                }

                break;
        }
    }

    // if (weather && currentLanguage == 'ru') {
    //     switch(item.weather[0].main) {

    //     }
    // }





    const onChangeCity = (e) => {
        currentCity = e.currentTarget.value;
    }

    const onChangeLanguage = (e) => {
        // currentLanguage = e.currentTarget.value;
        setCurrentLanguage(e.currentTarget.value);

    }

    return (
        <div className="content">
            <header className="content__header">
                <div className="content__logo">
                    <img src={header_logo} width='50px' alt="" />
                    <span>Weather App</span>
                </div>

                <div className='content__search-block'>
                    <div className='content__language'>
                        <select onChange={onChangeLanguage}>
                            <option value="en">en</option>
                            <option value="ru">ru</option>
                        </select>
                    </div>
                    <input className='content__search' placeholder={currentLanguage == 'en'
                        ? 'City name'
                        : 'Название города'} type="search" onChange={onChangeCity} />
                    <button className='content__search-btn' onClick={searchCity}>
                        {currentLanguage == 'en'
                            ? 'Search'
                            : 'Поиск'}
                    </button>
                </div>
            </header>
            <div className="content__row content__current">
                {console.log(weather)}
                {console.log(currentWeather)}
                <div className="content__col content__col-medium">
                    <div className='content__currentDate'>{currentDate}</div>
                    <div className='content__row-default'>

                        <div className="content__col-default">
                            <h1 className='content__main-title'>
                                {weather[0].weather[0].main}
                            </h1>
                            <div className='content__currentWeather'>
                                {currentWeather.data.main.temp}°
                            </div>

                        </div>
                        <div className="content__col-default">
                            <img src={`http://openweathermap.org/img/wn/${currentWeather.data.weather[0].icon}@2x.png`} alt="" />
                        </div>
                    </div>
                    <div className='content__currentCity'>{currentWeather.data.name}, {currentWeather.data.sys.country}</div>
                </div>
                <div className="content__col content__col-big">
                    <h2 className='content__description'>
                        {currentWeather.data.weather[0].description}
                    </h2>
                    <ul>
                        <li>
                            <img src={temp_feels_like} width='16' alt="" />
                            <div>{currentLanguage == 'en'
                                ? 'Feels like'
                                : 'Ощущается как'}: <span>{currentWeather.data.main.feels_like}°</span>
                            </div>
                        </li>
                        {/* <li>
                            <img src={temp_max} width='16' alt="" />
                            <div>{currentLanguage == 'en'
                                ? 'Max temperature'
                                : 'Максимальная температура'}: <span>{currentWeather.data.main.temp_max}°</span>
                            </div>
                        </li>
                        <li>
                            <img src={temp_min} width='16' alt="" />
                            <div>{currentLanguage == 'en'
                                ? 'Min temperature'
                                : 'Минимальная температура'}: <span>{currentWeather.data.main.temp_min}°</span>
                            </div>
                        </li> */}
                        <li>
                            <img src={humidity} width='16' alt="" />
                            <div>{currentLanguage == 'en'
                                ? 'Humidity'
                                : 'Влажность'}: <span>{currentWeather.data.main.humidity}%</span>
                            </div>
                        </li>
                        <li>
                            <img src={temp_feels_like} width='16' alt="" />
                            <div>{currentLanguage == 'en'
                                ? 'Preassure'
                                : 'Давление'}: <span>{currentWeather.data.main.pressure} {currentLanguage == 'en'
                                    ? 'chPa'
                                    : 'гПа'}</span>
                            </div>
                        </li>
                        <li>
                            <img src={visibility} width='16' alt="" />
                            <div>{currentLanguage == 'en'
                                ? 'Visibility'
                                : 'Видимость'}: <span>{currentWeather.data.visibility} {currentLanguage == 'en'
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
                        id={index}
                        title={item.weather[0].main}
                        icon={item.weather[0].icon}
                        weather={weather}
                        currentLanguage={currentLanguage} />
                })}
            </div>
        </div>
    )
}

export default Main