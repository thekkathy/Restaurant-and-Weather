import React, { Fragment, useEffect, useState, useContext } from 'react';
import RestaurantMap from './RestaurantMap';
import RestaurantList from './RestaurantList';
import ReactMapGL from 'react-map-gl';
import Search from './Search';
import { PositionContext } from '../../context/positionContext';
import _ from 'lodash';

const GOOGLE_API_KEY = process.env.REACT_APP_google_api_key;
const MAPBOX_API_KEY = process.env.REACT_APP_mapbox_api_key;

function RestaurantApp() {
  // const [position, setPosition] = useState({ lat: 38.0293, lon: -78.5055744 });
  const { position, setPosition } = useContext(PositionContext);
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
    // window.navigator.geolocation.getCurrentPosition(
    //   position => setPosition({ lat: position.coords.latitude, lon: position.coords.longitude })
    // );
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
  }, [position]);

  const sortRestaurants = (sortBy) => {
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
        if (sortBy === "Name") {
          obj.results = _.sortBy(obj.results, 'name');
        }
        else if (sortBy === "Price") {
          obj.results = _.orderBy(obj.results, ['price_level'], ['asc']);
        }
        else {
          obj.results = _.orderBy(obj.results, ['rating'], ['desc']);
        }
        setRestaurants(obj);
        setIsLoaded(true);
      })
  }


  const setSelected = (selected) => {
    setSelectedLocation(selected);
  }


  const render = () => {
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <Fragment>
          <RestaurantMap response={restaurants} setSelected={setSelected} />
        </Fragment>
      )
    }
  }

  const sortOptions = ["Price", "Rating", "Name"];

  return (
    <div className="container justify-content-center">
      <div className="row justify-content-center">
        <div className="display-3">Restaurant App</div>
      </div>
      <div className="row justify-content-center">
        <Search searchType="distance" position={position} distance={1000} setRestaurants={setRestaurants} setIsLoaded={setIsLoaded} setViewport={setViewport} setPosition={setPosition} GOOGLE_API_KEY={GOOGLE_API_KEY} />
        <Search searchType="address" position={position} distance={1000} setRestaurants={setRestaurants} setIsLoaded={setIsLoaded} setViewport={setViewport} setPosition={setPosition} GOOGLE_API_KEY={GOOGLE_API_KEY} />
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
          <div className="col-9 justify-content-center"><RestaurantList response={restaurants} setSelected={setSelected} sortBy={sort} position={position} GOOGLE_API_KEY={GOOGLE_API_KEY} /></div>
          <div className="col justify-content-center">
            <div className="row justify-content-center">

              <div className="ml-4 w-100">
                <div className="row w-100">
                  <div className="card w-100">
                    <div className="card-header">
                      Sort By
                    </div>
                    <div className="justify-content-center p-2">
                      <div class="dropdown mx-2 mt-2 mb-1 w-100">
                        <button class="dropdown-toggle w-75" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {sort ? sort : 'Select a Sort'}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          {sortOptions.map(option => {
                            return <a class="dropdown-item" onClick={(e) => {
                              e.preventDefault();
                              setSort(option);
                            }}>{option}</a>
                          })}

                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-info mx-2 mb-2 mt-1"
                        onClick={() => { sortRestaurants(sort) }}>
                        Submit
                    </button>
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

// <Sort selectType="Sort Restaurants" options={sortOptions} setFunct={setSelectedSort} />
//               {sort}

export default RestaurantApp;
