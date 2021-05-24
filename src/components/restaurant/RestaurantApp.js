import React, { Fragment, useEffect, useState } from 'react';
import RestaurantMap from './RestaurantMap';
import RestaurantList from './RestaurantList';
import ReactMapGL from 'react-map-gl';
import Search from './Search';
import Sort from './Sort';
import _ from 'lodash';

const GOOGLE_API_KEY = process.env.REACT_APP_google_api_key;
const MAPBOX_API_KEY = process.env.REACT_APP_mapbox_api_key;

function RestaurantApp() {
  const [position, setPosition] = useState({ lat: 38.0293, lon: -78.5055744 });
  const [restaurants, setRestaurants] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    width: '75vw',
    height: '75vh',
    latitude: position.lat,
    longitude: position.lon,
    zoom: 14
  });
  const [selectedLocation, setSelectedLocation] = useState({ lat: 38.0293, lng: -78.5055744 });
  const [sort, setSort] = useState("Name");

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setPosition({ lat: position.coords.latitude, lon: position.coords.longitude })
    );
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
    url.searchParams.append("key", GOOGLE_API_KEY);
    url.searchParams.append("location", position.lat + "," + position.lon);
    url.searchParams.append("radius", 1000);
    url.searchParams.append("type", 'restaurant');
    url.searchParams.append("opennow", true);
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        setRestaurants(obj);
        setIsLoaded(true);
      })
  }, []);

  const sortPrice = () => {
    let sortedArr = _.sortBy(restaurants, 'price_level');
    setRestaurants(sortedArr);
  }

  const sortName = () => {
    let sortedArr = _.sortBy(restaurants, 'name');
    setRestaurants(sortedArr);
  }

  const sortRating = () => {
    let sortedArr = _.sortBy(restaurants, 'rating');
    setRestaurants(sortedArr);
  }

  const sortRestaurants = () => {
    console.log("restuarants: ", restaurants.results);
    // if (sort === "Name") {
    //   sortName(restaurants);
    // }
    // else if (sort === "Price") {
    //   sortPrice(restaurants);
    // }
    // else {
    //   sortRating(restaurants);
    // }
  }


  const setSelected = (selected) => {
    setSelectedLocation(selected);
  }

  const setSelectedSort = (sortType) => {
    setSort(sortType);
  }

  const render = () => {
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      sortRestaurants();
      return (
        <Fragment>
          <RestaurantMap response={restaurants} setSelected={setSelected} />
        </Fragment>
      )
    }
  }

  const sortOptions = ["Price", "Rating", "Name"];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="display-2">Restaurant App</div>
      </div>
      <div className="row justify-content-center">
        <Search searchType="distance" position={position} distance={1000} setRestaurants={setRestaurants} setIsLoaded={setIsLoaded} setViewport={setViewport} GOOGLE_API_KEY={GOOGLE_API_KEY} />
        <Search searchType="address" position={position} distance={1000} setRestaurants={setRestaurants} setIsLoaded={setIsLoaded} setViewport={setViewport} GOOGLE_API_KEY={GOOGLE_API_KEY} />
      </div>
      <div className="row justify-content-center">
        <div className="row mb-4">
          <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={MAPBOX_API_KEY}
            mapStyle="mapbox://styles/kkathy2000/ckozkmila0vla17n3sndf8gcm"
          >
            {render()}
          </ReactMapGL>
        </div>
        <div className="row w-100 justify-content-center m-4">
          <div className="col-9"><RestaurantList response={restaurants} setSelected={setSelected} sortBy={sort} position={position} GOOGLE_API_KEY={GOOGLE_API_KEY} /></div>
          <div className="col">
            <div className="row">
              <Sort selectType="Sort Restaurants" options={sortOptions} setFunct={setSelectedSort} />
              {sort}

              <div className="ml-4">
                <div className="row">
                  <div className="card">
                    <div className="card-header">
                      Sort By
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      {sortOptions.map(option => {
                        return <button type="button" className="btn btn-secondary" key={option} onClick={(e) => {
                          e.preventDefault();
                          setSort(option);
                        }}>
                          {option}
                        </button>
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RestaurantApp;
