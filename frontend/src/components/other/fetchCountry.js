export default async function fetchCountry() {
  const respons = await fetch(
   'https://countryapi.io/api/all?apikey=HdzeBEklrjBfFbK5Y1IGHQiUzaCpgYd5yPDM0QyH'
  );
  const countryData = await respons.json();
  const result = Object.values(countryData).map(country => ({
    name: country.name,
    capital: country.capital,
    lat: country.latLng.capital[0],
    long: country.latLng.capital[1]
  }));     
  return result;
}
