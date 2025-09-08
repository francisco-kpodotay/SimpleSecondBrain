import { Clock } from "./Clock";
import { TimeProgress } from "./TimeProgress";
import { Weather } from "./Weather";
import { FaGear } from "react-icons/fa6";
import "./infoBoard.css";
import { Modal } from "../modal/Modal";
import { useEffect, useState } from "react";

export function InfoBoard() {
  const [showSettings, setShowSettings] = useState(false);
  const [workStartHour, setWorkStartHour] = useState("09:00:00");
  const [workFinishHour, setWorkFinishHour] = useState("15:00:00");
  const [location, setLocation] = useState({
    name: "ICELAND",
    latitudeLongitude: [65, -18],
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
      if (!storedPublicId) return;

      const response = await fetch(`/api/user/${storedPublicId}`);
      const userData = await response.json();

      if (!userData) return;
      setLocation({
        name: userData.country,
        latitudeLongitude: [userData.latitude, userData.longitude],
      });
      setWorkStartHour(userData.workStartTime);
      setWorkFinishHour(userData.workEndTime);
    };

    fetchData();
  }, [showSettings]);

  return (
    <>
      <div id={"section-top"} className="section">
        <h1>{`{ Simple Second Brain }`}</h1>
        <div id={"gear-icon"} onClick={() => setShowSettings(true)}>
          <FaGear size={25} />
        </div>
        {showSettings && <Modal doClose={() => setShowSettings(false)} />}
      </div>
      <div className="section">
        <div id="infoBoard">
          <Clock />
          <Weather location={location} />
          <TimeProgress
            workStartHour={workStartHour}
            workFinishHour={workFinishHour}
          />
        </div>
      </div>
    </>
  );
}
