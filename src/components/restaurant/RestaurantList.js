import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import './CSS/RestaurantList.css'
import './CSS/RestaurantMap.css';

const RestaurantList = ({ response, setSelected, sortBy, position, GOOGLE_API_KEY }) => {
    const [restaurants, setRestaurants] = useState([]);

    const coordsToString = (lat, lon) => {
        return lat + "," + lon;
    }

    return (
        <div className="card w-100" style={{ width: "18rem" }}>
            <h2 className="card-header text-center">List of Restaurants</h2>
            <ul className="list-group list-group-flush no-bullets d-flex">
                {(typeof response.results != "undefined") ?
                    response.results.map(
                        restuarant => {
                            return <li
                                key={restuarant.name}
                                latitude={restuarant.geometry.location.lat}
                                longitude={restuarant.geometry.location.lng}
                                className="justify-content-center"
                            >
                                <div className="row">
                                    <div className="col-9">
                                        <button
                                            className="list-group-item w-100 justify-content-center"
                                            onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    setSelected(
                                                        {
                                                            "name": restuarant.name,
                                                            "lat": restuarant.geometry.location.lat,
                                                            "lng": restuarant.geometry.location.lng
                                                        }
                                                    );
                                                }
                                            }>
                                            <div>{restuarant.name}</div>
                                            <div>Price: {restuarant.price_level}, Rating: {restuarant.rating}</div>
                                        </button>
                                    </div>
                                    <div className="col my-auto">
                                        <a
                                            href={`https://www.google.com/maps/dir/${coordsToString(position.lat, position.lon)}/${coordsToString(restuarant.geometry.location.lat, restuarant.geometry.location.lng)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span style={{fontSize: "2em", color:"gray"}}>
                                                <i class="fas fa-directions"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </li>

                        })
                    :
                    null}
            </ul>
        </div>
    )
}

export default RestaurantList
