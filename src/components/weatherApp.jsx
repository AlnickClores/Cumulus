import { useState } from "react";
import axios from "axios";
import "./weatherApp.css";

function WeatherApp() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=962dc840b0815ceaba639d846649a739`;

  const handleSearchLocation = async () => {
    if (location) {
      try {
        const response = await axios.get(url);
        setWeather(response.data);
        console.log(response.data);
        setLocation("");
      } catch (err) {
        console.log(err);
      }
      setIsEmpty("");
    } else {
      setIsEmpty("Please Enter a Location");
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">Cumulus</h1>
      <p className="sub-title">
        <i>Weather App</i>
      </p>
      <div className="search-container">
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="Enter a City... (Denver, US)"
        />
        <button onClick={handleSearchLocation}>Search</button>
        {isEmpty ? <p className="error">{isEmpty}</p> : null}
      </div>

      {typeof weather.main !== "undefined" ? (
        <div className="main-weather-container">
          <div className="weather-container">
            <h1 className="weather-temp">
              <span className="weather-main">{weather.main.temp}</span>°C
            </h1>
            <h1 className="weather-location">
              {weather.name}, {weather.sys.country}
            </h1>
          </div>
          <div className="whp-container">
            <div className="whp-child">
              <h1>
                <span className="weather-main">{weather.wind.speed}</span>km/h
              </h1>
              <p>Wind</p>
            </div>
            <div className="whp-child">
              <h1>
                <span className="weather-main">{weather.main.humidity}</span>%
              </h1>
              <p>Humidity</p>
            </div>
            <div className="whp-child">
              <h1>
                <span className="weather-main">{weather.main.pressure}</span>mb
              </h1>
              <p>Pressure</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default WeatherApp;
