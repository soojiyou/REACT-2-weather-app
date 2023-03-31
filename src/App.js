import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import { Button } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";


// 1. show the weather information based on the current location (city, c, f, weather)
// 2. 5 buttons (1 for current location, 4 for other city)
// 3. click the city buttons => show the weather informations
// 4. click the current location button => show the weather information
// 5. loading spinner until the weather information loaded
// 6. make input box to get city input to show the weather information
const API_KEY = 'ec700b8387676a0dc3b3ac989505350a';
const cities = ['seoul', 'seattle', 'new york', 'los angeles'];
// const API_KEY = process.env.REACT_APP_API_KEY;


function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const [weathericon, setWeathericon] = useState(null);
  const [inputValue, setInputValue] = useState('');


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log(lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeathericon(data.weather[0].icon);
      setWeather(data);
      console.log("a", weathericon);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

  }

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeathericon(data.weather[0].icon);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

  }

  const handleCityChange = (city) => {
    if (city === "current") { setCity(null); } else { setCity(city); }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputValue);
    getWeatherByCity(city);
  };


  useEffect(() => {
    if (city == null) { getCurrentLocation(); } else { getWeatherByCity(); console.log("check1", weathericon); }
  }, [city]);



  return (
    <div>
      {loading ? (<div className='container'>
        <h1>WEATTHER TODAY</h1>
        <ClipLoader color="white" loading={loading} size={150} />
      </div>)
        : (<div className='container'>
          <h1>WEATHER TODAY</h1>
          <WeatherBox weather={weather} city={city} weathericon={weathericon} />
          <WeatherButton cities={cities} selectedCity={city} handleCityChange={handleCityChange} />
          <form onSubmit={handleSubmit} >
            <input className="searchbar" type="text" placeholder="Type City Name" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
            <Button className="search" variant="secondary" type="submit" value="Submit">Search</Button>
          </form>



        </div>
        )}

    </div>

  );
}

export default App;