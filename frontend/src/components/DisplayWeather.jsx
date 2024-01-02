/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import fetchWeather from "./fetchWeather";

export default function DisplayWeather() {
  const  location  = { name: "Iceland", latitudeLongitude: [65, -18] };
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWeather(location).then((weatherDate) => {
      setData(weatherDate);
    });
  }, []);

  return data === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="displayWeather">
      <div className="temp-data">
        <div className="w-temp">{data.temperature} °C</div>
        <div className="w-loc">{location.name}</div>
      </div>
      <img src={data.icon}></img>
    </div>
  );
}


