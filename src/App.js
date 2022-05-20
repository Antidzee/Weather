import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ce75cc7f5965ad830e2387b715e7e358`;
  function searchLocation(e) {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  }

  return (
    <div className="App relative w-full h-[100vh] text-white bg-[rgba(0,0,0,0.4)]">
      <div className="search text-center p-[1rem]">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>

      <div className="container max-w-[700px] h-[700px] m-auto p-[0 1rem] relative top-[10%] flex flex-col justify-between">
        <div className="top sm:px-7">
          <div className="location">
            <p>{data.name}</p>
            {data.main && (
              <div className="temp">
                <h1>{data.main.temp.toFixed()} °C</h1>
              </div>
            )}
            {data.weather && (
              <div className="description">
                <p>{data.weather[0].main}</p>
              </div>
            )}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="font-bold flex justify-center">
                  {data.main.feels_like.toFixed()} °C
                </p>
              )}
              <p className="flex justify-center">Feels like</p>
            </div>
            <div className="humidity">
              {data.main && (
                <p className="font-bold flex justify-center">
                  {data.main.humidity}%
                </p>
              )}
              <p className="flex justify-center">Humidity</p>
            </div>
            <div className="wind">
              {data.wind && (
                <p className="font-bold flex justify-center">
                  {data.wind.speed.toFixed()} MPH
                </p>
              )}
              <p className="flex justify-center">Wind</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
