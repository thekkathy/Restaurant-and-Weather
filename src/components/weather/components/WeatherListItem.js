import React, { useState } from 'react'

const WeatherListItem = ({ id, dt, weatherDesc, weatherIcon, listType }) => {
    const iconURL = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    const getDate = () => {
        const unixTimestamp = dt;
        const milliseconds = unixTimestamp * 1000;
        const dateObject = new Date(milliseconds);

        const dayOfWeek = dateObject.toLocaleString("en-US", { weekday: "long" });
        const month = dateObject.toLocaleString("en-US", { month: "long" });
        const day = dateObject.toLocaleString("en-US", { day: "numeric" });
        const year = dateObject.toLocaleString("en-US", { year: "numeric" });
        const hour = dateObject.toLocaleString("en-US", { hour: "numeric" });
        if (listType === "hourly") {
            const dateString = month + " " + day + ", " + year + " " + hour;
            return dateString;
        }
        else {
            const dateString = dayOfWeek + " " + month + " " + day + ", " + year;
            return dateString;
        }
    }

    return (
        <li key={id} className="list-group-item d-flex flex-row">
            {getDate()}: {weatherDesc}
            {weatherIcon.length ? <img className="weather-icon mr-auto" src={iconURL} alt={weatherDesc}></img> : null}
        </li>
    )
}

export default WeatherListItem
