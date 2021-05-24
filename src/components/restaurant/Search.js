import React, { useState } from 'react'
import Geocode from "react-geocode";

const Search = ({ searchType, position, distance, setRestaurants, setIsLoaded, setViewport, GOOGLE_API_KEY }) => {
    const [dist, setDist] = useState(1000);
    const [address, setAddress] = useState("Charlottesville");
    const [coords, setCoords] = useState({ lat: 38.0293, lon: -78.5055744 });

    Geocode.setApiKey(GOOGLE_API_KEY);
    Geocode.setLanguage("en");

    const getNearbyRestaurantsWithDistance = async (e) => {
        if (e.key === 'Enter') {
            const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
            url.searchParams.append("key", GOOGLE_API_KEY);
            url.searchParams.append("location", position.lat + "," + position.lon);
            url.searchParams.append("radius", dist);
            url.searchParams.append("type", 'restaurant');
            url.searchParams.append("opennow", true);

            const n = 1000 - dist
            const zoom_factor = n / (1000 * Math.abs(n / 1000));
            let zoom_val = 14 + zoom_factor;
            console.log(zoom_val);
            if (zoom_val < 0) {
                zoom_val = 0;
            }
            else if (zoom_val > 15) {
                zoom_val = 15;
            }

            await fetch(url)
                .then((resp) => {
                    return resp.json();
                })
                .then((obj) => {
                    setRestaurants(obj);
                    setIsLoaded(true);
                    setViewport({
                        width: '75vw',
                        height: '75vh',
                        latitude: position.lat,
                        longitude: position.lon,
                        zoom: zoom_val
                    });
                })
        }
    }

    const getNearbyRestaurantsWithAddress = async (e) => {
        if (e.key === 'Enter') {
            Geocode.fromAddress(address).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setCoords({ "lat": lat, "lon": lng });
                },
                (error) => {
                    console.error(error);
                }
            );


            const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
            url.searchParams.append("key", GOOGLE_API_KEY);
            url.searchParams.append("location", coords.lat + "," + coords.lon);
            url.searchParams.append("radius", distance);
            url.searchParams.append("type", 'restaurant');
            url.searchParams.append("opennow", true);
            await fetch(url)
                .then((resp) => {
                    return resp.json();
                })
                .then((obj) => {
                    setRestaurants(obj);
                    setIsLoaded(true);
                    setViewport({
                        width: '75vw',
                        height: '75vh',
                        latitude: coords.lat,
                        longitude: coords.lon,
                        zoom: 14
                    });
                })
        }
    }

    return (
        <div className="m-4">
            {searchType === "distance" ? <div>
                <label>Filter By Distance From Your Current Location</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Type a distance in meters, then press enter"
                    onChange={(e) => {
                        e.preventDefault();
                        setDist(e.target.value);
                    }}
                    onKeyPress={getNearbyRestaurantsWithDistance}
                />
            </div>
                :
                <div>
                    <label>Find Nearby Restaurants from Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type an address, then press enter"
                        onChange={(e) => {
                            e.preventDefault();
                            setAddress(e.target.value);
                        }}
                        onKeyPress={getNearbyRestaurantsWithAddress}
                    />
                </div>}

        </div>
    )
}

export default Search
