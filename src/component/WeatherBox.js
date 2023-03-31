import React from 'react'
// {weather?.name} = {weather && weather.name}

const WeatherBox = ({ weather, weathericon, city }) => {
    let fahrenheit = weather && weather.main ? ((weather.main.temp * 1.8) + 32).toFixed(2) : "";


    return (

        <div>
            <div className='weather-box'>

                <div>{weather?.name}</div>
                <h2>{weather?.main.temp.toFixed(2)}°C / {fahrenheit}°F </h2>
                <h3>{weather?.weather[0].description.toUpperCase()}</h3>
                <div>
                    <div className="card"><img src={`https://openweathermap.org/img/wn/${weathericon}@2x.png`} /></div>
                </div>

            </div>
        </div>



    )
}

export default WeatherBox