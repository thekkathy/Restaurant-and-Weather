import React from 'react'
import NavigateButton from './NavigateButton';

const AppPage = ({ children }) => {
    return (
        <div>
            {children}
            <div className="row justify-content-center mb-4">
                <NavigateButton buttonName="Back To Home" url="/"></NavigateButton>
            </div>
        </div>
    )
}

export default AppPage
