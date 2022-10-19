import "./SunInfo.scss";
import sunrise from "./../../assets/images/sunrise.png";
import sunset from "./../../assets/images/sunset.png";

const SunInfo = ({ darkMode, currentWeather, currentLanguage }) => {
    const sunriseValue = new Date(currentWeather.data.sys.sunrise * 1000);
    const sunsetValue = new Date(currentWeather.data.sys.sunset * 1000);

    return (
        <div
            className={
                !darkMode
                    ? "content__col content__col-small"
                    : "content__col content__col-small content__col-dark"
            }
        >
            <div className="sunInfo">
                <div className="sunInfo__content">
                    <div
                        className={
                            !darkMode
                                ? "sunInfo__time sunInfo__time-light"
                                : "sunInfo__time sunInfo__time-dark"
                        }
                    >
                        <span>
                            {currentLanguage === "en" ? "Sunrise" : "Восход"}
                        </span>
                        {`${sunriseValue.getHours()}:${sunriseValue.getMinutes()}`}
                    </div>

                    <img src={sunrise} alt="sunrise" />
                </div>
                <div className="sunInfo__content">
                    <div
                        className={
                            !darkMode
                                ? "sunInfo__time sunInfo__time-light"
                                : "sunInfo__time sunInfo__time-dark"
                        }
                    >
                        <span>
                            {currentLanguage === "en" ? "Sunset" : "Закат"}
                        </span>
                        {`${sunsetValue.getHours()}:${sunsetValue.getMinutes()}`}
                    </div>

                    <img src={sunset} alt="sunset" />
                </div>
            </div>
        </div>
    );
};

export default SunInfo;
