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

    const [weather, setWeather] = useState();
    const [currentWeather, setCurrentWeather] = useState();

    let currentCity = 'Moscow';
    const api = 'd779f17843098d3158c1d2a9115ce239';
    let arr = [];
    let currentDate;
    
    const searchCity = () => {
        
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&appid=${api}`).then(city => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric`).then(response => {
                setCurrentWeather(response)
            })
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric`).then(response => {
                for (let i = 0; i < 7; i++) {
                    arr[i] = response.data.daily[i]
                }
                setWeather(arr)
                
            })
        })
        
    }



    useEffect(() => {
        searchCity(currentCity)
    }, [currentCity])

    if (!weather) {
        return <div>loading...</div>
    }

    if (weather) {
        switch (new Date(weather[0].dt * 1000).getDay()) {
            case 1:
                currentDate = 'Monday';
                break;
            case 2:
                currentDate = 'Tuesday';
                break;
            case 3:
                currentDate = 'Wednesday';
                break;
            case 4:
                currentDate = 'Thursday';
                break;
            case 5:
                currentDate = 'Friday';
                break;
            case 6:
                currentDate = 'Saturday';
                break;
            case 0:
                currentDate = 'Sunday';
                break;   
        }
    }

    const onChangeCity = (e) => {
        currentCity = e.currentTarget.value
    }

    return (
        <div className="content">
            <header className="content__header">
                <div className="content__logo">
                    <img src={header_logo} width='50px' alt="" />
                    <span>Weather App</span> 
                </div>
                <div className='content__search-block'>
                    <input className='content__search' placeholder='City name' type="search" name="" id="" onChange={onChangeCity} />
                    <button className='content__search-btn' onClick={searchCity}>Search</button>
                </div>
            </header>
            <div className="content__row content__current">
                {console.log(weather)}
                {console.log(currentWeather)}
     
                <div className="content__col content__col-medium">
                <div className='content__currentDate'>{currentDate}</div>
                    <div className='content__row-default'>
                        
                        <div className="content__col-default">
                            <h1 className='content__main-title'>{currentWeather.data.weather[0].main}</h1>
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
                            <div>Feels like: <span>{currentWeather.data.main.feels_like}°</span> </div>        
                        </li>
                        <li>
                            <img src={temp_max} width='16' alt="" />
                            <div>Max temperature: <span>{currentWeather.data.main.temp_max}°</span>  </div>
                                   
                        </li>
                        <li>
                            <img src={temp_min} width='16' alt="" />
                            <div>Min temperature: <span>{currentWeather.data.main.temp_min}°</span> </div>
                             
                        </li>
                        <li>
                            <img src={humidity} width='16' alt="" />
                            <div>Humidity: <span>{currentWeather.data.main.humidity}%</span></div>
                             
                        </li>
                        <li>
                            <img src={temp_feels_like} width='16' alt="" />
                            <div>Preassure: <span>{currentWeather.data.main.pressure} hPa</span> </div>
                             
                        </li>
                        <li>
                            <img src={visibility} width='16' alt="" />
                            <div>Visibility: <span>{currentWeather.data.visibility} m</span></div>
                             
                        </li>
                    </ul>
                </div>
            </div>
            <div className="content__row content__forecast">
                {weather.map((item, index) => {
                    return <WeatherBlock id={index} title={item.weather[0].main} icon={item.weather[0].icon} weather={weather} />
                })}
            </div>
        </div>
    )
}

export default Main