import React from 'react'
import { useHistory } from 'react-router-dom';

const NavigateButton = ({buttonName, url}) => {
    const history = useHistory();

    return (
        <div>
            <button className="btn btn-info m-4" onClick={() => {history.push(url)}}>
                {buttonName}
            </button>
        </div>
    )
}

export default NavigateButton
