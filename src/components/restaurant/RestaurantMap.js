import React, { Fragment } from 'react'
import { Marker } from 'react-map-gl';
import './CSS/RestaurantMap.css';

const RestaurantMap = ({ response, setSelected }) => {

    return (
        <div>
            <Fragment>
                {(typeof response.results != "undefined") ?
                    response.results.map(
                        restuarant => {
                            return <Marker
                                key={restuarant.name}
                                latitude={restuarant.geometry.location.lat}
                                longitude={restuarant.geometry.location.lng}>
                                <button className='marker-btn' onClick={
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
                                    ◉
                                </button>
                            </Marker>
                        })
                    :
                    null}
            </Fragment>
        </div>
    )
}

export default RestaurantMap
