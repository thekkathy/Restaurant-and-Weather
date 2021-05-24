import React from 'react'

const SelectOptions = ({ selectType, options, setFunct }) => {
    return (
        <div className="ml-4">
            <div className="row">
                <div className="card">
                    <div className="card-header">
                        {selectType}
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {options.map(option => {
                            return <button type="button" className="btn btn-secondary" key={option} onClick={(e) => {
                                e.preventDefault();
                                setFunct(option);
                            }}>
                                {option}
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectOptions
