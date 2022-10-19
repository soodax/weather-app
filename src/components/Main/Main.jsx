import './Main.scss';
import * as axios from "axios";
import { useEffect, useState } from "react";
import WeatherBlock from '../WeatherBlock/WeatherBlock';
import Header from './../Header/Header';
import Preloader from '../../assets/images/preloader.gif';
import MapComponent from '../MapComponent/MapComponent';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import SunInfo from '../SunInfo/SunInfo';

const Main = ({
    darkMode,
    changeMode
}) => {

    const [weather, setWeather] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentCity, setCurrentCity] = useState('');
    // const [mapData, setMapData] = useState('');

    const api = process.env.REACT_APP_API_KEY
    const mainURL = 'https://api.openweathermap.org/';
    let currentDate;

    const getData = async (geolocation) => {
        try {
            // const map = await axios.get(`https://tile.openweathermap.org/map/temp_new/1/1/1.png?appid=${api}`)
            // console.log(map)
            // setMapData(map)
    
            const city = await axios.get(`${mainURL}geo/1.0/direct?q=${geolocation}&appid=${api}`)
            
            const resCurrentWeather = await axios.get(`${mainURL}data/2.5/weather?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`)
            setCurrentWeather(resCurrentWeather)
            
            const resWeatherForecast = await axios.get(`${mainURL}data/2.5/onecall?lat=${city.data[0].lat}&lon=${city.data[0].lon}&appid=${api}&units=metric&lang=${currentLanguage}`)
            const weatherForecast = [];
    
            for (let i = 0; i < 7; i++) {
                weatherForecast[i] = resWeatherForecast.data.daily[i]
            }
            
            setWeather(weatherForecast)
        } catch (error) {
            alert(error)
        }
        
    }

    const searchCity = async () => {       
        if (!currentCity) {          
            if (navigator.geolocation) {              
                navigator.geolocation.getCurrentPosition(async (position) => {       
                    try {
                        const location = await axios.get(`${mainURL}geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api}`)
                        setCurrentCity(location.data[0].name)    
                        getData(location.data[0].name)
                        console.log(location.data[0].name)
                        console.log('geo base city')
                    } catch (error) {
                        alert(error)
                    }       
                    
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

                <CurrentWeather darkMode={darkMode}
                    currentDate={currentDate}
                    weather={weather}
                    currentWeather={currentWeather}/>

                <AdditionalInfo darkMode={darkMode}
                    currentLanguage={currentLanguage}
                    currentWeather={currentWeather}/>

                <SunInfo darkMode={darkMode}
                    currentWeather={currentWeather}
                    currentLanguage={currentLanguage}/>


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
            {/* <MapComponent mapData={mapData}/> */}

        </div>
    )
}

export default Main