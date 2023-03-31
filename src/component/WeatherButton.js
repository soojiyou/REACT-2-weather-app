import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherBotton = ({ cities, selectedCity, handleCityChange }) => {
    return (
        <div>

            <Button className='button-additional'
                variant="outline-secondary"
                onClick={() => handleCityChange("current")}>
                CURRENT CITY</Button>

            {cities.map((city, index) => (
                <Button className='button-additional'
                    key={index}
                    variant="outline-secondary"
                    onClick={() => handleCityChange(city)}>
                    {city.toUpperCase()}</Button>
            ))}

        </div>
    )
}

export default WeatherBotton