import { useState, useEffect } from "react";
import fetchWeather from "./fetchWeather";

export function Weather() {
  const location = { name: "ICELAND", latitudeLongitude: [65, -18] };
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWeather(location).then((weatherDate) => {
      setData(weatherDate);
    });
  }, []);

  return data === null ? (
    <div id="infoPanel">
      <h1>Loading...</h1>
    </div>
  ) : (
    <div id="infoPanel">
      <div id="weatherContainer">
        <div>
          <p>
            <strong>{location.name}</strong>
          </p>
          <p>WEATHER</p>
        </div>
        <div id="weatherIconContainer">
          <img src={data.icon}></img>
        </div>
        <div>
          <p>{data.temperature} °C</p>
          <p>{data.text}</p>
        </div>
      </div>
    </div>
  );
}
