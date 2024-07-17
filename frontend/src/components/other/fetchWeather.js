export default async function fetchWeather({ latitudeLongitude }) {
  const respons = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=8c1d9333a3734b66b9e122100231311&q=\n
    ${latitudeLongitude.join(",")}`
  );
  const weatherData = await respons.json();
  let result = {
    temperature: weatherData.current.temp_c,
    text: weatherData.current.condition.text,
    icon: weatherData.current.condition.icon,
  };
  return result;
}
//fetchWeather({ name: "Iceland", latitudeLongitude: [65, -18] });