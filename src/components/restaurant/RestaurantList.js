import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import './CSS/RestaurantList.css'

const RestaurantList = ({ response, setSelected, sortBy, position, GOOGLE_API_KEY }) => {
    const [restaurants, setRestaurants] = useState([]);

    // const sortByPrice = async () => {
    //     const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
    //     url.searchParams.append("key", GOOGLE_API_KEY);
    //     url.searchParams.append("location", position.lat + "," + position.lon);
    //     url.searchParams.append("radius", 1000);
    //     url.searchParams.append("type", 'restaurant');
    //     url.searchParams.append("opennow", true);

    //     await fetch(url)
    //         .then((resp) => {
    //             return resp.json();
    //         })
    //         .then((obj) => {
    //             sortPrice(obj)
    //         })
    // }

    // const sortByName = async () => {
    //     const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
    //     url.searchParams.append("key", GOOGLE_API_KEY);
    //     url.searchParams.append("location", position.lat + "," + position.lon);
    //     url.searchParams.append("radius", 1000);
    //     url.searchParams.append("type", 'restaurant');
    //     url.searchParams.append("opennow", true);

    //     await fetch(url)
    //         .then((resp) => {
    //             return resp.json();
    //         })
    //         .then((obj) => {
    //             sortName(obj)
    //         })
    // }

    // const sortByRating = async () => {
    //     const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
    //     url.searchParams.append("key", GOOGLE_API_KEY);
    //     url.searchParams.append("location", position.lat + "," + position.lon);
    //     url.searchParams.append("radius", 1000);
    //     url.searchParams.append("type", 'restaurant');
    //     url.searchParams.append("opennow", true);

    //     await fetch(url)
    //         .then((resp) => {
    //             return resp.json();
    //         })
    //         .then((obj) => {
    //             sortRating(obj)
    //         })
    // }



    // const sortPrice = () => {
    //     let sortedArr = _.sortBy(restaurants, 'price_level');
    //     setRestaurants(sortedArr);
    // }

    // const sortName = () => {
    //     let sortedArr = _.sortBy(restaurants, 'name');
    //     setRestaurants(sortedArr);
    // }

    // const sortRating = () => {
    //     let sortedArr = _.sortBy(restaurants, 'rating');
    //     setRestaurants(sortedArr);
    // }

    // useEffect(() => {
    //     const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
    //     url.searchParams.append("key", GOOGLE_API_KEY);
    //     url.searchParams.append("location", position.lat + "," + position.lon);
    //     url.searchParams.append("radius", 1000);
    //     url.searchParams.append("type", 'restaurant');
    //     url.searchParams.append("opennow", true);

    //     fetch(url)
    //         .then((resp) => {
    //             return resp.json();
    //         })
    //         .then((obj) => {
    //             setRestaurants(obj.results);
    //         })
    // }, []);

    return (
        <div className="card w-100" style={{ width: "18rem" }}>
            <h2 className="card-header text-center">List of Restaurants</h2>
            <ul className="list-group list-group-flush no-bullets d-flex">
                {(typeof response.results != "undefined") ?
                    response.results.map(
                        restuarant => {
                            return <button
                                className="list-group-item"
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
                                <li
                                    key={restuarant.name}
                                    latitude={restuarant.geometry.location.lat}
                                    longitude={restuarant.geometry.location.lng}
                                >
                                    <div>{restuarant.name}</div>
                                    <div>Price: {restuarant.price_level}, Rating: {restuarant.rating}</div>
                                </li>
                            </button>
                        }) 
                    :
                    null}
            </ul>
        </div>
    )
}

export default RestaurantList
