import './WeatherBlock.scss';

const WeatherBlock = ({
    title,
    icon,
    weather
}) => {
    return (
        <div className='main__block'>
            <div className='main__title'>
                {title}
                <img src={icon} width='24' alt="" />
            </div>
            <div className="main__content">
                {weather}
            </div>
        </div>
    )
}

export default WeatherBlock;