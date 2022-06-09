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

const Main = (props) => {

    const [weather, setWeather] = useState();
    let currentCity = 'Moscow';
    const api = 'd779f17843098d3158c1d2a9115ce239';

    const searchCity = () => {
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&appid=${api}`).then(city => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric`).then(response => {
                setWeather(response.data)
            })
        })     
    }

    useEffect(() => {
        searchCity(currentCity)
    }, [currentCity] )

    if (!weather) {
        return <div>loading...</div>
    }

    const onChangeCity = (e) => {
        currentCity = e.currentTarget.value
    }

    return (<div className="main">
        {console.log(weather)}
        <WeatherBlock title={'Place'} icon={homeIcon} weather={`${weather.name}, ${weather.sys.country}`} />
        <WeatherBlock title={'Temperature'} icon={temp} weather={`${weather.main.temp}°`} />
        <WeatherBlock title={'Feels like'} icon={temp_feels_like} weather={`${weather.main.feels_like}°`} />
        <WeatherBlock title={'Humidity'} icon={humidity} weather={`${weather.main.humidity}%`} />
        <WeatherBlock title={'Preassure'} icon={temp_feels_like} weather={`${weather.main.pressure} hPa`} />
        <WeatherBlock title={'Max temperature'} icon={temp_max} weather={`${weather.main.temp_max}°`} />
        <WeatherBlock title={'Min temperature'} icon={temp_min} weather={`${weather.main.temp_min}°`} />
        <WeatherBlock title={weather.weather[0].main} icon={weatherIcon} weather={weather.weather[0].description} />
        <WeatherBlock title={'Visibility'} icon={visibility} weather={`${weather.visibility} m`} />

        <div className='search__block'>
            <div className="main__search-content">
                <input className='main__search' placeholder='City name' type="search" name="" id="" onChange={onChangeCity} />
                <button className='main__btn-go' onClick={searchCity}>Search</button>
            </div>
        </div>
    </div>)
}

export default Main