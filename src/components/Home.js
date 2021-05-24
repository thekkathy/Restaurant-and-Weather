import React from 'react'
import NavigateButton from './NavigateButton';

const Home = () => {
    return (
        <div className="m-4">
            <h1 className="text-center display-3">Home</h1>
            <div className="row justify-content-center">
                <NavigateButton buttonName="View Weather Here" url="/weather" />
                <NavigateButton buttonName="View Restaurants Here" url="/restaurant" />
            </div>
        </div>
    )
}

export default Home
