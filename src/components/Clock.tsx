import "./clock.css";

export type ClockProps = {
  hours: number;
  minutes: number;
};
const Clock: React.FC<ClockProps> = ({ hours, minutes }) => {
  const rotationMinutes = minutes * (360 / 60);
  const rotationHours = hours * (360 / 12) + minutes * (360 / 60 / 12);
  return (
    <div>
      <h1>
        {hours}:
        {minutes}
      </h1>
      <div className="clock">
        <div className="hours-container">
          <div
            className="hours"
            style={{ transform: `rotate(${rotationHours}deg)` }}
          ></div>
        </div>
        <div className="minutes-container">
          <div
            className="minutes"
            style={{ transform: `rotate(${rotationMinutes}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Clock;
