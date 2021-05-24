import React from 'react'

const WeatherCard = ({ heading, location, weatherMain, weatherDesc, weatherIcon }) => {
    const iconURL = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

    return (
        <div className="card m-4">
            <div className="row justify-content-center m-4">
                <div className="row w-100 m-2 justify-content-center">
                    <div className="heading h3">{heading}</div>
                </div>
                <div className="row w-100 m-2 justify-content-center">
                    <div className="location h3">{location}</div>
                </div>
                <div className="row w-100 mt-3 justify-content-center">
                    <div className="weather-main display-4">{weatherMain}</div>
                </div>
                <div className="row w-100 m-1 justify-content-center">
                    <div className="weather-desc h4">{weatherDesc}</div>
                </div>
                <div className="row w-100 m-1 justify-content-center">
                    {weatherIcon.length ? <img className="weather-icon" src={iconURL} alt={weatherDesc} style={{ width: "10rem", height: "10rem" }}></img> : null}

                </div>
            </div>
        </div>
    )
}

export default WeatherCard
