import { useState, useEffect } from "react";
import fetchCountry from "../other/fetchCountry";

export function UpdateUser() {
  const [title, setTitle] = useState("Update");
  const [countrys, setCountrys] = useState([]);
  const [publicId, setPublicId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");
  const [country, setCountry] = useState("");

  function alphaetSort(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const fetchCountries = async () => {
      let result = await fetchCountry();
      result = result.sort(alphaetSort);
      setCountrys(result);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
      if (!storedPublicId) return;

      setPublicId(storedPublicId);

      const response = await fetch(`/api/user/${storedPublicId}`);
      const userData = await response.json();

      setUserName(userData.userName);
      setPassword(userData.password);
      setLatitude(userData.latitude);
      setLongitude(userData.longitude);
      setWorkStartTime(userData.workStartTime);
      setWorkEndTime(userData.workEndTime);
      setCountry(userData.country);
    };

    fetchUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
      if (!storedPublicId) return;

    const userData = {
      userName,
      password,
      latitude,
      longitude,
      workStartTime,
      workEndTime,
      country,
    };

    try {
      const response = await fetch(`/api/user/${publicId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setTitle("Update failed");
        return;
      }

      const updatedUser = await response.json();
      console.log("User updated successfully:", updatedUser);
      setTitle("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      setTitle("Error updating user");
    }
  }

  function handleCountryChange(e) {
    setCountry(e.target.options[e.target.selectedIndex].getAttribute("name"));
    const selectedCountry = e.target.value.split(",");
    setLatitude(selectedCountry[0]);
    setLongitude(selectedCountry[1]);
  }

  return (
    <div>
      <h2 value={title}>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username-update">Username: </label>
          <input
            type="text"
            id="username-update"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password-update">Password: </label>
          <input
            type="password"
            id="password-update"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country-update">Country: </label>
          <select
            name="countrys"
            id="country-update"
            onChange={handleCountryChange}
            value={`${latitude},${longitude}`}
          >
            {countrys &&
              countrys.map((c) => (
                <option key={c.name} value={`${c.lat},${c.long}`} name={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="latitude-update">Latitude: </label>
          <input
            type="text"
            id="latitude-update"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="longitude-update">Longitude: </label>
          <input
            type="text"
            id="longitude-update"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="workStartTime-update">Work Start Time: </label>
          <input
            type="text"
            id="workStartTime-update"
            value={workStartTime}
            onChange={(e) => setWorkStartTime(e.target.value)}
            placeholder="09:00:00"
          />
        </div>
        <div>
          <label htmlFor="workEndTime-update">Work End Time: </label>
          <input
            type="text"
            id="workEndTime-update"
            value={workEndTime}
            onChange={(e) => setWorkEndTime(e.target.value)}
            placeholder="18:00:00"
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}
