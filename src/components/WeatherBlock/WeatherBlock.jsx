import { useState } from 'react';
import './WeatherBlock.scss';

const WeatherBlock = ({
    id,
    title,
    icon,
    weather
}) => {

    const [isFull, changeList] = useState(false);
    let wd;
   

    switch (new Date(weather[id].dt * 1000).getDay()) {
        case 1:
            wd = 'Mon';
            break;
        case 2:
            wd = 'Tue';
            break;
        case 3:
            wd = 'Wed';
            break;
        case 4:
            wd = 'Thu';
            break;
        case 5:
            wd = 'Fri';
            break;
        case 6:
            wd = 'Sat';
            break;
        case 0:
            wd = 'Sun';
            break;   
    }

    return (
        <div className='weatherBlock__block'>
            <div className='weatherBlock__date'>{wd}</div>
            <div className='weatherBlock__title'>
                
                {title}
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
            </div>
            <div className="weatherBlock__content">
                <h2 className='weatherBlock__description'>{weather[id].weather[0].description}</h2>
                <ul className='weatherBlock__shortList'>
                    <li>Morning: <span>{weather[id].temp.morn}°</span> </li>
                    <li>Day: <span>{weather[id].temp.day}°</span> </li>
                    <li>Evening: <span>{weather[id].temp.eve}°</span> </li>
                    <li>Night: <span>{weather[id].temp.night}°</span> </li>
                </ul>
                {!isFull 
                ? null 
                : <ul className='weatherBlock__fullList'>
                    <li>Max: <span>{weather[id].temp.max}°</span> </li>
                    <li>Min: <span>{weather[id].temp.min}°</span> </li>
                    <li>Humidity: <span>{weather[id].humidity}%</span> </li>
                    <li>Pressure: <span>{weather[id].pressure} hPa</span> </li>
                </ul>
                }
            
            </div>
            {
                    !isFull 
                    ? <button className='weatherBlock__btn' onClick={() => changeList(true)}>show more</button> 
                    : <button className='weatherBlock__btn' onClick={() => changeList(false)}>close</button>
                }
        </div>
    )
}

export default WeatherBlock;