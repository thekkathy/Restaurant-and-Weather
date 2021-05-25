import React, { Fragment } from 'react'
import WeatherListItem from './WeatherListItem'

const WeatherList = ({ predictions, listType }) => {

    return (
        <div className="content w-100 m-4">
            {(typeof predictions != "undefined") && <ul className="list-group">
                {predictions.map((prediction) => {
                    return (
                        <Fragment>
                            {(typeof prediction.weather != "undefined") ? <WeatherListItem
                                id={prediction.weather[0].id}
                                dt={prediction.dt}
                                weatherDesc={prediction.weather[0].description}
                                weatherIcon={prediction.weather[0].icon}
                                listType={listType}
                            /> : null}
                        </Fragment>
                    )

                })}
            </ul>}

        </div>
    )
}

export default WeatherList
