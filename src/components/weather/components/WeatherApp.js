import React, { Fragment, useEffect, useState } from 'react';
import NavigateButton from '../../NavigateButton';
import API_KEY from '../keys';
import WeatherCard from './WeatherCard'
import WeatherList from './WeatherList'

function WeatherApp() {
  const [weather, setWeather] = useState({});
  const [zip, setZip] = useState(10001);
  const [city, setCity] = useState("New York");
  const [freq, setFreq] = useState("hourly");
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setPosition({ lat: position.coords.latitude, lon: position.coords.longitude })
    );
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("lat", position.lat);
    url.searchParams.append("lon", position.lon);
    console.log(position.lat);
    console.log(position.lon);
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        setHourly(obj.hourly);
        setDaily(obj.daily);
        console.log(obj.hourly);
        console.log(obj.daily);
      })
    return () => {
      setPosition({});
    }
  }, [])

  const getCurrentWeatherWithZip = async (e) => {
    if (e.key === 'Enter') {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.append("appid", API_KEY);
      url.searchParams.append("zip", zip);
      url.searchParams.append("units", "imperial");
      await fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          setWeather(obj);
        })
    }
  }

  const getZipLocation = (weather) => {
    return `${weather.name}, ${weather.sys.country}`;
  }

  const getCurrentWeatherWithCity = async (e) => {
    if (e.key === 'Enter') {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.append("appid", API_KEY);
      url.searchParams.append("q", city);
      url.searchParams.append("units", "imperial");
      await fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          setWeather(obj);
        })
    }
  }


  return (
    <div>
      <main className="p-4">
        <div className="display-3 text-center m-4">
          Weather App
        </div>
        <div className="card m-4">
          <div className="row justify-content-center m-4">
            <div className="row w-100 m-2">
              <div className="heading h3">Search With Zip Code</div>
            </div>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Find current weather with zip code (press enter to display)"
              aria-label="Search"
              onChange={e => { setZip(e.target.value) }}
              onKeyPress={getCurrentWeatherWithZip}
            />
            <div className="row h3 m-4">or</div>
            <div className="row w-100">
              <div className="heading h3">Search With City Name</div>
            </div>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Find current weather with city and state (press enter to display)"
              aria-label="Search"
              onChange={e => { setCity(e.target.value) }}
              onKeyPress={getCurrentWeatherWithCity}
            />
          </div>
          {(typeof weather.main != "undefined") ? <WeatherCard
            heading="CURRENT WEATHER"
            location={getZipLocation(weather)}
            weatherMain={weather.weather[0].main}
            weatherDesc={weather.weather[0].description}
            weatherIcon={weather.weather[0].icon}
          />
            :
            <WeatherCard
              heading="CURRENT WEATHER"
              location=""
              weatherMain=""
              weatherDesc=""
              weatherIcon=""
            />}
        </div>

        <div className="card m-4">
          <div className="row justify-content-center m-4">
            <div className="row w-100 m-2 justify-content-center">
              <div className="heading h3">View hourly forecast for the next two days or daily forecast for the next week at your current location.</div>
            </div>
            <div className="btn-group-lg mt-4" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary mx-4" onClick={() => setFreq("hourly")}>Hourly</button>
              <button type="button" className="btn btn-primary mx-4" onClick={() => setFreq("daily")}>Daily</button>
            </div>
          </div>
          <div className="row justify-content-center p-4">
            {(freq === "hourly") ?
              <Fragment>
                <WeatherList predictions={hourly} listType="hourly" />
              </Fragment>
              :
              <WeatherList predictions={daily} listType="daily" />
            }
          </div>
        </div>
      </main>
      <div className="row justify-content-center mb-4">
            <NavigateButton buttonName="Back To Home" url="/"></NavigateButton>
      </div>
    </div>
  );
}

export default WeatherApp;
