import { Clock } from "./Clock";
import { TimeProgress } from "./TimeProgress";
import { Weather } from "./Weather";

export function InfoBoard() {
  return (
    <>
      <h1>{`{ Simple Second Brain }`}</h1>
      <div id="infoBoard">
        <Clock />
        <Weather />
        <TimeProgress />
      </div>
    </>
  );
}
