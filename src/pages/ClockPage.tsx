import { useState } from "react";
import TimeForm from "../components/TimerForm";
import Clock from "../components/Clock";
import "./clockPage.css";

export type ClockState = {
  hours: number;
  minutes: number;
};
const ClockPage = () => {
  const [time, setTime] = useState<ClockState>({ hours: 0, minutes: 0 });
  return (
    <div className="page">
      <TimeForm setTime={setTime}></TimeForm>
      <Clock hours={time.hours} minutes={time.minutes}></Clock>
    </div>
  );
};
export default ClockPage;
