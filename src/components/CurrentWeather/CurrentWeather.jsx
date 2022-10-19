import './CurrentWeather.scss';

const CurrentWeather = ({
    darkMode,
    currentDate,
    weather,
    currentWeather
}) => {
    return (
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
    )
}

export default CurrentWeather;